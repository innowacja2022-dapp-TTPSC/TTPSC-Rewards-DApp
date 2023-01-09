import { createContext, ReactElement, ReactNode, useContext, useMemo } from "react";


export type Connection = {
  // The ID about transactions being sent, and any possible error with them
  txBeingSent?: string;
  transactionError?: string;
  networkError?: string;
};


export type ConnectionServiceValue = {

};

export type ConnectionServiceNullableValue =
  | {
    isInitialized: false;
  }
  | {
    isInitialized: true;
    value: ConnectionServiceValue;
  };

export const ConnectionService = createContext<ConnectionServiceNullableValue>({
  isInitialized: false,
});

export const useConnectionService = (): ConnectionServiceValue => {
  const context = useContext(ConnectionService);

  if (!context.isInitialized) {
    throw new Error("ConnectionService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const ConnectionServiceProvider = ({ children }: Props): ReactElement => {
  const value = useMemo<ConnectionServiceNullableValue>(() => {
    return {
      isInitialized: true,
      value: {

      },
    };
  }, []);

  return (
    <ConnectionService.Provider value={value}>{children}</ConnectionService.Provider>
  );
};