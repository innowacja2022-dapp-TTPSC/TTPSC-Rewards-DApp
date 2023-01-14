import { useQuery, useQueryClient } from "@tanstack/react-query";
import { _initialize } from "@utils/initialize";
import { ethers } from "ethers";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
const HARDHAT_NETWORK_ID = 1337;

export type Token = {
  //The info of the token (i.e. It's Name and symbol)
  name: string;
  symbol: string;
};

export type Wallet = {
  _pollDataInterval: NodeJS.Timer;
  _token: ethers.Contract;
  balance: string;
  selectedAddress: string;
  tokenData: Token;
};

export type InitWallet = {
  _pollDataInterval: NodeJS.Timer;
  _token: ethers.Contract;
  tokenData: Token;
};

type WalletKey = ["wallet", string] | ["wallet"];

export type AnonWallet = {
  _connectWallet: () => Promise<void>;
};

export type AuthWallet = {
  _disconnectWallet: () => Promise<void>;
  _getAddress: () => string;
};

export type WalletServiceValue =
  | {
      status: "loading";
    }
  | {
      status: "auth";
      value: AuthWallet;
    }
  | {
      status: "anon";
      value: AnonWallet;
    };

type WalletServiceState =
  | {
      status: "auth";
      value: Wallet;
    }
  | {
      status: "anon";
    };

export const WalletService = createContext<WalletServiceValue>({
  status: "loading",
});

export const useWalletService = (): WalletServiceValue["status"] => {
  const context = useContext(WalletService);
  return context.status;
};

export const useAnonWalletService = (): AnonWallet => {
  const context = useContext(WalletService);

  if (context.status !== "anon") {
    throw new Error("AnonService not defined");
  }

  return context.value;
};

export const useAuthWalletService = (): AuthWallet => {
  const context = useContext(WalletService);
  if (context.status !== "auth") {
    throw new Error("AuthService not defined");
  }
  return context.value;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const WalletServiceProvider = ({ children }: Props): ReactElement => {
  const client = useQueryClient();

  const { data } = useQuery(
    getSessionQueryKey(),
    async (): Promise<WalletServiceState> => {
      const authorization = localStorage.getItem("authorization");
      if (authorization) {
        if (!window.ethereum) {
          return Promise.reject(new Error("No MetaMask"));
        }
        const wallet = await _initialize();
        if (wallet) {
          return Promise.resolve({
            status: "auth",
            value: wallet,
          });
        }
        client.setQueryData<WalletServiceState>(getSessionQueryKey(), {
          status: "anon",
        });
        localStorage.removeItem("authorization");
        return Promise.resolve({
          status: "anon",
        });
      }

      return Promise.resolve({ status: "anon" });
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const value = useMemo<WalletServiceValue>(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            _connectWallet: async () => {
              console.log(data?.status);
              if (!window.ethereum) {
                return Promise.reject(new Error("No MetaMask"));
              }
              const wallet = await _initialize();
              if (wallet) {
                client.setQueryData<WalletServiceState>(getSessionQueryKey(), {
                  status: "auth",
                  value: wallet,
                });
                localStorage.setItem("authorization", "auth");
                console.log(wallet._token.listenerCount());
                return Promise.resolve();
              }

              return Promise.reject();
              // We reinitialize it whenever the user changes their account.
              // window.ethereum.on("accountsChanged", (newAddress: string) => {
              //   _stopPollingData(_pollDataInterval);
              //   // `accountsChanged` event can be triggered with an undefined newAddress.
              //   // This happens when the user removes the Dapp from the "Connected
              //   // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
              //   // To avoid errors, we reset the dapp state
              //   if (newAddress === undefined) {
              //     throw new Error("no address");
              //   }

              //   _initialize(newAddress);
              // });

              // We reset the dapp state if the network is changed
              // window.ethereum.on("chainChanged", (chainId: string) => {
              //   _stopPollingData(_pollDataInterval);
              //   window.location.reload();
              // });
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            _disconnectWallet: () => {
              client.setQueryData<WalletServiceState>(getSessionQueryKey(), {
                status: "anon",
              });
              localStorage.removeItem("authorization");
              return Promise.resolve();
            },
            _getAddress: () => {
              return data.value.selectedAddress;
            },
          },
        };
      default:
        return { status: "loading" };
    }
  }, [client, data]);

  return (
    <WalletService.Provider value={value}>{children}</WalletService.Provider>
  );
};
