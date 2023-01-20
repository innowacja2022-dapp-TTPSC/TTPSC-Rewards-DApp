import { NoWalletDetected } from "@components/NoWalletDetected";
import { MainBox } from "@routes/Root/MainBox/MainBox";
import { ReactElement } from "react";

const Root = (): ReactElement => {
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  return <MainBox />;
};

export default Root;
