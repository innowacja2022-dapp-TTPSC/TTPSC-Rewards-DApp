import { Box, Center, Heading } from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { MainBox } from "@routes/ContentWraper/MainBox/MainBox";
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
    return <MainBox />
      ;
  }
  return <Center minH="91.15vh"><Heading as="h3">
    Wallet not connected
  </Heading>
  </Center>
};

export default Root;
