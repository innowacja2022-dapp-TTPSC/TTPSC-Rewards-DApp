import { Box } from "@chakra-ui/react";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { MainBox } from "@routes/Root/MainBox/MainBox";
import { WalletService } from "@services/WalletService";
import { ReactElement, useContext } from "react";

const Root = (): ReactElement => {
  const context = useContext(WalletService);
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }
  if (context.status === "auth" && context.wallet.isAdmin) {
    return <MainBox />;
  }

  return <Box> X</Box>;
};

export default Root;
