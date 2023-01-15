import { Loading } from "@components/Loading";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { MainBox } from "@routes/Root/MainBox/MainBox";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";

const Root = (): ReactElement => {
  const status = useWalletService();

  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  if (status === "loading") {
    return <Loading />;
  }
  return <MainBox />;
};

export default Root;
