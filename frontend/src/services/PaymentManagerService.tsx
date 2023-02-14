import contractAddress from "@contracts/contract-address.json";
import PaymentsManager from "@contracts/PaymentsManager.json";
import { QueryFunction } from "@tanstack/react-query";
import { ethers } from "ethers";
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
  id: number;
  requestReason: string;
  status: PaymentRequestStatus;
};

export type PaymentRequet = {
  address: string;
  amount: number;
  paymentRequestReason: string;
};

type RequestKey = ["request", string] | ["request"];

export type PaymnetManagerServiceValue = {
  _createPaymentRequest: (paymentRequest: PaymentRequet) => Promise<void>;
  _getAllRequests: QueryFunction<Requests[], RequestKey>;
  changeRequestStatus: (request: Requests) => Promise<void>;
  requestKey: (query?: string) => RequestKey;
};

export type PaymnetManagerServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: PaymnetManagerServiceValue;
    };

export const PaymnetManagerService =
  createContext<PaymnetManagerServiceNullableValue>({
    isInitialized: false,
  });

export const usePaymnetManagerService = (): PaymnetManagerServiceValue => {
  const context = useContext(PaymnetManagerService);
  if (!context.isInitialized) {
    throw new Error("PaymnetManagerService not defined");
  }
  return context.value;
};

type Props = {
  children: ReactNode;
};

export const PaymnetManagerServiceProvider = ({
  children,
}: Props): ReactElement => {
  const context = useContext(WalletService);

  const value = useMemo<PaymnetManagerServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }

    const _payment = new ethers.Contract(
      contractAddress.PaymentsManager,
      PaymentsManager.abi,
      context.wallet.provider.getSigner()
    );
    return {
      isInitialized: true,
      value: {
        _createPaymentRequest: (paymentRequest) => {
          const result = _payment.createPaymentRequest(
            paymentRequest.address,
            paymentRequest.amount,
            paymentRequest.paymentRequestReason
          );
          if (!result) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
        requestKey: (query) => {
          return query ? ["request", query] : ["request"];
        },

        _getAllRequests: async ({ queryKey }) => {
          const [, query] = queryKey;
          const result = await _payment.getPaymentRequestHistory();
          return result;
        },
        changeRequestStatus: async (request) => {
          let result;
          if (request.status === 1) {
            result = await _payment.acceptPaymentRequest(
              request.id,
              request.decisionReason
            );
          } else {
            result = await _payment.rejectPaymentRequest(
              request.id,
              request.decisionReason
            );
          }
          if (!result) {
            return Promise.reject();
          }
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return (
    <PaymnetManagerService.Provider value={value}>
      {children}
    </PaymnetManagerService.Provider>
  );
};
