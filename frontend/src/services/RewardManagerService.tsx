import contractAddress from "@contracts/contract-address.json";
import RewardsManagerArtifact from "@contracts/RewardsManager.json";
import { QueryFunction } from "@tanstack/react-query";
import { getTransactionData } from "@utils/mock";
import { ethers } from "ethers";
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

export type Collect = {
  address: string;
  id: number;
  quantity: number;
};

type TransactionKey = ["transaction", string] | ["transaction"];

export type RewardManagerServiceValue = {
  _getTransactionData: QueryFunction<Transactions[], TransactionKey>;
  _markCollected: (collect: Collect) => Promise<void>;
  listKey: (query?: string) => TransactionKey;
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
      },
    };
  }, [context]);

  return (
    <RewardManagerService.Provider value={value}>
      {children}
    </RewardManagerService.Provider>
  );
};
