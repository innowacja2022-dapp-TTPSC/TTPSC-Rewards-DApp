import { useState } from "react";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers

// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { Box } from "@chakra-ui/react";
import { Connection } from "@services/SendService";
import { Wallet } from "@services/WalletService";
import { ReactElement } from "react";
import { Loading } from "./Loading";
import { NoTokensMessage } from "./NoTokensMessage";
import { NoWalletDetected } from "./NoWalletDetected";
import { Transfer } from "./Transfer/Transfer";

// This is the Hardhat Network id that we set in our hardhat.config.js.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
//const HARDHAT_NETWORK_ID = '1337';

// This is an error code that indicates that the user canceled a transaction
//const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions
//   5. Renders the whole application
//
// Note that (3) and (4) are specific of this sample application, but they show
// you how to keep your Dapp and contract's state in sync,  and how to send a
// transaction.

export const Dapp = (): ReactElement => {
  const [connection, setConnetcion] = useState<Connection>();
  const [wallet, setWallet] = useState<Wallet>();

  // console.log(wallet);

  // Ethereum wallets inject the window.ethereum object. If it hasn't been
  // injected, we instruct the user to install MetaMask.
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  // The next thing we need to do, is to ask the user to connect their wallet.
  // When the wallet gets connected, we are going to save the users's address
  // in the component's state. So, if it hasn't been saved yet, we have
  // to show the ConnectWallet component.
  //
  // Note that we pass it a callback that is going to be called when the user
  // clicks a button. This callback just calls the _connectWallet method.
  if (!wallet?.selectedAddress) {
    return (
      <Box />
      // <ConnectWallet
      //   handleWallet={setWallet}
      //   networkError={connection?.networkError}
      //   handleConnection={setConnetcion}
      // />
    );
  }

  // If the token data or the user's balance hasn't loaded yet, we show
  // a loading component.
  if (!wallet?.tokenData || !wallet.balance) {
    return <Loading />;
  }

  // If everything is loaded, we render the application.
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12">
          <h1>
            {wallet.tokenData.name} ({wallet.tokenData.symbol})
          </h1>
          <p>
            Welcome <b>{wallet.selectedAddress}</b>, you have{" "}
            <b>
              {wallet.balance.toString()} {wallet.tokenData.symbol}
            </b>
            .
          </p>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12">
          {/*
              Sending a transaction isn't an immediate action. You have to wait
              for it to be mined.
              If we are waiting for one, we show a message here.
            */}
          {/* {connection.txBeingSent && (
            <WaitingForTransactionMessage txHash={connection.txBeingSent} />
          )} */}

          {/*
              Sending a transaction can fail in multiple ways. 
              If that happened, we show a message here.
            */}
          {/* {connection.transactionError && (
            <TransactionErrorMessage
              message={connection.transactionError}
              dismiss={() =>
                setConnetcion((prev) => ({
                  ...prev,
                  transactionError: undefined,
                }))
              }
            />
          )} */}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/*
              If the user has no tokens, we don't show the Transfer form
            */}
          {wallet.balance === 0 && (
            <NoTokensMessage selectedAddress={wallet.selectedAddress} />
          )}

          {/*
              This component displays a form that the user can use to send a 
              transaction and transfer some tokens.
              The component doesn't have logic, it just calls the transferTokens
              callback.
            */}
          {wallet.balance > 0 && wallet?._token && (
            <Transfer
              _token={wallet._token}
              from={wallet.selectedAddress}
              tokenSymbol={wallet.tokenData.symbol}
            />
          )}
        </div>
      </div>
    </div>
  );
};
