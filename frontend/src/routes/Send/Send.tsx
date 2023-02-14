import { ConnectYourWallet } from "@components/ConnectYourWallet/ConnectYourWallet";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";
import SendForm from "./SendForm";

const Send = (): ReactElement => {
  const status = useWalletService();

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  if (status === "auth") {
    return <SendForm />;
  }
  return <ConnectYourWallet />;
};

export default Send;
