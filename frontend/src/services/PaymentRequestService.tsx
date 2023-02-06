import { QueryFunction } from "@tanstack/react-query";
import { getRequestList } from "@utils/mock";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { WalletService } from "./WalletService";

export enum PaymentRequestStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export type Requests = {
  address: string;
  amount: number;
  decisionMaker: string;
  decisionReason: string;
  requestReason: string;
  status: PaymentRequestStatus;
};

export type Collect = {
  address: string;
  id: number;
  quantity: number;
};

type RequestKey = ["request", string] | ["request"];

export type PaymentRequestServiceValue = {
  _getPaymentRequestHistory: QueryFunction<Requests[], RequestKey>;
  //_markCollected: (collect: Collect) => Promise<void>;
  listKey: (query?: string) => RequestKey;
};

export type PaymentRequestServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: PaymentRequestServiceValue;
    };

export const PaymentRequestService =
  createContext<PaymentRequestServiceNullableValue>({
    isInitialized: false,
  });

export const usePaymentRequestService = (): PaymentRequestServiceValue => {
  const context = useContext(PaymentRequestService);
  if (!context.isInitialized) {
    throw new Error("PaymentRequestService not defined");
  }
  return context.value;
};

type Props = {
  children: ReactNode;
};

export const PaymentRequestServiceProvider = ({
  children,
}: Props): ReactElement => {
  const context = useContext(WalletService);

  const value = useMemo<PaymentRequestServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        _getPaymentRequestHistory: async ({ queryKey }) => {
          const [, query] = queryKey;
          const result = await getRequestList();
          return result;
        },
        listKey: (query) => {
          return query ? ["request", query] : ["request"];
        },
      },
    };
  }, [context]);

  return (
    <PaymentRequestService.Provider value={value}>
      {children}
    </PaymentRequestService.Provider>
  );
};
