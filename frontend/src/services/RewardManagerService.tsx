import contractAddress from "@contracts/contract-address.json";
import RewardsManagerArtifact from "@contracts/RewardsManager.json";
import { QueryFunction } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { BigNumber, ethers } from "ethers";
import { create } from "ipfs-http-client";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { WalletService } from "./WalletService";

export type Transactions = {
  address: string;
  id: number;
  quantity: number;
  reward: string;
};

export type Awards = {
  id: number;
  imgHash: string;
  inStock: number;
  name: string;
  price: number;
};

export type EditAward = {
  newAward: Awards;
  oldAward: Awards;
};

export type AddAwards = {
  image?: Buffer;
  inStock: number;
  name: string;
  price: number;
};

export type Collect = {
  address: string;
  id: number;
  quantity: number;
};

export type Order = {
  id: number;
  value: string;
};

type TransactionKey = ["transaction", string] | ["transaction"];
type AwardKey = ["award", string] | ["award"];

export type RewardManagerServiceValue = {
  _addReward: (award: AddAwards) => Promise<void>;
  _editReward: (editAward: EditAward) => Promise<void>;
  _getAllRewards: QueryFunction<Awards[], AwardKey>;
  _getTransactionData: QueryFunction<Transactions[], TransactionKey>;
  _markCollected: (collect: Collect) => Promise<void>;
  listKey: (query?: string) => TransactionKey;
  placeOrder: (order: Order) => Promise<void>;
  rewardKey: (query?: string) => AwardKey;
};

export type RewardManagerServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: RewardManagerServiceValue;
    };

export const RewardManagerService =
  createContext<RewardManagerServiceNullableValue>({
    isInitialized: false,
  });

export const useRewardManagerService = (): RewardManagerServiceValue => {
  const context = useContext(RewardManagerService);
  if (!context.isInitialized) {
    throw new Error("RewardManagerService not defined");
  }
  return context.value;
};

type Props = {
  children: ReactNode;
};

const projectId = "2LgHlFzv4982nlvznqlNjsPfJsz";
const projectSecret = "61c831cd70b10da132f6d244107ec1ce";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const waitForAllowance = async (
  maxTimeout: number,
  amount: BigNumber,
  tokenContract: ethers.Contract,
  owner: string,
  spender: string
) => {
  const startTime = Date.now();
  let delay = 2000;
  return new Promise(async (resolve, reject) => {
    while (Date.now() - startTime < maxTimeout) {
      const allowance = await tokenContract.allowance(owner, spender);
      if (allowance >= amount) {
        console.log("Allowance is huge enough");
        return resolve("good");
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      console.log("No allowance, check again in: ", delay);
      delay += 3000;
    }
    reject(new Error("Timeout reached - unable to place order"));
  });
};

const getRewardName = async (id: number, _rewards: ethers.Contract) => {
  const result = await _rewards.rewards(id);

  return result.name;
};

export const RewardManagerServiceProvider = ({
  children,
}: Props): ReactElement => {
  const context = useContext(WalletService);

  const value = useMemo<RewardManagerServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    const _rewards = new ethers.Contract(
      contractAddress.RewardsManager,
      RewardsManagerArtifact.abi,
      context.wallet.provider.getSigner()
    );
    return {
      isInitialized: true,
      value: {
        _getTransactionData: async ({ queryKey }) => {
          const [, query] = queryKey;

          const results = await _rewards.getAllPendingOrders();
          const transactions = await Promise.all(
            results.map(async (result) => {
              const userOrders = result.orders.filter(
                (order) => order.pendingQuantity > 0
              );
              const ordersArray = await Promise.all(
                userOrders.map(async (singleOrder) => {
                  const reward = await _rewards.rewards(
                    singleOrder.id.toNumber()
                  );
                  return {
                    address: result.user,
                    id: singleOrder.id.toNumber(),
                    quantity: singleOrder.pendingQuantity.toNumber(),
                    reward: reward.name,
                  };
                })
              );

              return ordersArray;
            })
          );
          const x: Transactions[] = [];

          transactions.map((val) => {
            if (val.length > 0) {
              val.forEach((element) => {
                x.push(element);
              });
            }
          });

          return x;
        },
        listKey: (query) => {
          return query ? ["transaction", query] : ["transaction"];
        },
        _markCollected: async (collect) => {
          const result = await _rewards.markCollected(
            collect.address,
            collect.id,
            collect.quantity
          );
          if (!result) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        rewardKey: (query) => {
          return query ? ["award", query] : ["award"];
        },
        _getAllRewards: async ({ queryKey }) => {
          const [, query] = queryKey;
          const result = await _rewards.getAllRewards();
          return result.filter((val) => {
            return val.inStock > 0;
          });
        },
        _addReward: async (award: AddAwards) => {
          if (!award.image) {
            return Promise.reject();
          }
          const created = await client.add(award.image);
          const url = `https://ttpsc.infura-ipfs.io/ipfs/${created.path}`;
          const result = await _rewards.addReward(
            award.name,
            url,
            ethers.utils.parseUnits(award.price.toString(), "ether"),
            award.inStock
          );
          if (!result) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        _editReward: async ({ oldAward, newAward }: EditAward) => {
          if (oldAward.inStock !== newAward.inStock) {
            const result = await _rewards.changeInStock(
              newAward.id,
              newAward.inStock
            );
            if (!result) {
              return Promise.reject();
            }
          }
          if (oldAward.price !== newAward.price) {
            const result = await _rewards.changeInStock(
              newAward.id,
              newAward.inStock
            );
            if (!result) {
              return Promise.reject();
            }
          }
          return Promise.resolve();
        },
        placeOrder: async ({ id, value }) => {
          const amount: BigNumber = ethers.utils.parseUnits(value, "ether");
          const spender = _rewards.address;
          const owner = context.wallet.selectedAddress;

          try {
            await context.wallet._token.approve(spender, amount);
            await waitForAllowance(
              30000,
              amount,
              context.wallet._token,
              owner,
              spender
            );
            await _rewards.placeOrder(id, 1);
          } catch (error) {
            console.log("Failed to approve allowance:", error);
            return Promise.reject();
          }

          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return (
    <RewardManagerService.Provider value={value}>
      {children}
    </RewardManagerService.Provider>
  );
};
