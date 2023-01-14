import { Box } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import { NoWalletDetected } from "@components/NoWalletDetected";
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
  if (status === "auth") {
    return <Box>Polaczony</Box>;
  }
  return <Box>Nie polaczony</Box>;
};

export default Root;
