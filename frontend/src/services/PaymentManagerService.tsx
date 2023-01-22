import { QueryFunction } from "@tanstack/react-query";
import { getTransactionData } from "@utils/mock";
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
  quantity: string;
  reward: string;
};

type TransactionKey = ["transaction", string] | ["transaction"];

export type PaymentManagerServiceValue = {
  _getTransactionData: QueryFunction<Transactions[], TransactionKey>;
  listKey: (query?: string) => TransactionKey;
};

export type PaymentManagerServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: PaymentManagerServiceValue;
    };

export const PaymentManagerService =
  createContext<PaymentManagerServiceNullableValue>({
    isInitialized: false,
  });

export const usePaymentManagerService = (): PaymentManagerServiceValue => {
  const context = useContext(PaymentManagerService);
  if (!context.isInitialized) {
    throw new Error("PaymentManagerService not defined");
  }
  return context.value;
};

type Props = {
  children: ReactNode;
};

export const PaymentManagerServiceProvider = ({
  children,
}: Props): ReactElement => {
  const context = useContext(WalletService);

  const value = useMemo<PaymentManagerServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        _getTransactionData: async ({ queryKey }) => {
          const [, query] = queryKey;
          const result = await Promise.resolve(getTransactionData());

          return result;
        },
        listKey: (query) => {
          return query ? ["transaction", query] : ["transaction"];
        },
      },
    };
  }, [context]);

  return (
    <PaymentManagerService.Provider value={value}>
      {children}
    </PaymentManagerService.Provider>
  );
};
