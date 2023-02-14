import contractAddress from "@contracts/contract-address.json";
import RewardsManagerArtifact from "@contracts/RewardsManager.json";
import { QueryFunction } from "@tanstack/react-query";
import { getTransactionData } from "@utils/mock";
import { Buffer } from "buffer";
import { ethers } from "ethers";
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
  quantity: string;
  reward: string;
};

export type Awards = {
  amount: number;
  image?: Buffer;
  name: string;
  price: number;
};

export type Collect = {
  address: string;
  id: number;
  quantity: number;
};

type TransactionKey = ["transaction", string] | ["transaction"];
type AwardKey = ["award", string] | ["award"];

export type RewardManagerServiceValue = {
  _addReward: (award: Awards) => Promise<void>;
  _getAllRewards: QueryFunction<Awards[], AwardKey>;
  _getTransactionData: QueryFunction<Transactions[], TransactionKey>;
  _markCollected: (collect: Collect) => Promise<void>;
  listKey: (query?: string) => TransactionKey;
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
          const result = await Promise.resolve(getTransactionData());

          // const result = await _rewards.getAllPendingOrders();

          return result;
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
          return result;
        },
        _addReward: async (award: Awards) => {
          if (!award.image) {
            return Promise.reject();
          }
          const created = await client.add(award.image);
          const url = `https://ipfs.infura.io/ipfs/${created.path}`;
          const result = await _rewards.addReward(
            award.name,
            url,
            award.price,
            award.amount
          );
          if (!result) {
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
