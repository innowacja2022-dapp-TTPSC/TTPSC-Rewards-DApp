import { Connection } from "@services/SendService";
import { ReactElement } from "react";
import { NetworkErrorMessage } from "../../../components/NetworkErrorMessage";
import { _connectWallet } from "./ConnectWallet.utils";
import { Wallet } from "@components/Dapp";

type Props = {
  networkError?: string;
  handleConnection: React.Dispatch<
    React.SetStateAction<Connection | undefined>
  >;
  handleWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>;
};

export const ConnectWallet = ({
  networkError,
  handleConnection,
  handleWallet,
}: Props): ReactElement => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage
              message={networkError}
              dismiss={() => handleConnection(undefined)}
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => _connectWallet(handleWallet)}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
