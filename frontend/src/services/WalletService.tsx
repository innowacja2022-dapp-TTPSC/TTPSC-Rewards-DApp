import { _initialize } from "@utils/initialize";
import { _stopPollingData } from "@utils/pollingData";
import { ethers } from "ethers";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Token = {
  //The info of the token (i.e. It's Name and symbol)
  name: string;
  symbol: string;
};

export type Wallet = {
  _pollDataInterval: NodeJS.Timer;
  _token: ethers.Contract;
  balance: string;
  isAdmin: boolean;
  selectedAddress: string;
  tokenData: Token;
};

export type InitWallet = {
  _pollDataInterval: NodeJS.Timer;
  _token: ethers.Contract;
  tokenData: Token;
};

export type AnonWallet = {
  _connectWallet: () => Promise<void>;
};

export type AuthWallet = {
  _disconnectWallet: () => Promise<void>;
  _getAddress: () => string;
  _isAdmin: () => boolean;
};

export type WalletServiceValue =
  | {
      status: "loading";
    }
  | {
      status: "auth";
      value: AuthWallet;
      wallet: Wallet;
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
  const [data, setData] = useState<WalletServiceState | undefined>({
    status: "anon",
  });
  useEffect(() => {
    window.ethereum.on("chainChanged", () => {
      if (data?.status === "auth" && data.value) {
        _stopPollingData(data.value._pollDataInterval);
      }
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", async (newAddress: string) => {
      if (data?.status === "auth" && data.value) {
        _stopPollingData(data.value?._pollDataInterval);
      }
      if (newAddress.length === 0) {
        localStorage.removeItem("authorization");
        setData({ status: "anon" });
      } else {
        const initWallet = await _initialize();
        if (initWallet) {
          setData({ status: "auth", value: initWallet });
        }
      }
    });

    return;
  }, [data]);

  const value = useMemo<WalletServiceValue>(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            _connectWallet: async () => {
              if (!window.ethereum) {
                return Promise.reject(new Error("No MetaMask"));
              }
              const initWallet = await _initialize();
              if (initWallet) {
                setData({ status: "auth", value: initWallet });
                localStorage.setItem("authorization", "auth");
                return Promise.resolve();
              }

              return Promise.reject(new Error("Something went wrong"));
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            _disconnectWallet: () => {
              localStorage.removeItem("authorization");
              setData({ status: "anon" });

              return Promise.resolve();
            },
            _getAddress: () => {
              return data.value.selectedAddress;
            },
            _isAdmin: () => {
              return data.value.isAdmin;
            },
          },
          wallet: data.value,
        };
      default:
        return { status: "loading" };
    }
  }, [data]);

  return (
    <WalletService.Provider value={value}>{children}</WalletService.Provider>
  );
};
