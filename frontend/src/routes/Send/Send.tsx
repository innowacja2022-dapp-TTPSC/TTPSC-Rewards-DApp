import { Flex, Heading } from "@chakra-ui/react";
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
  return (
    <Flex alignItems="center" h="full" justifyContent="center" w="full">
      <Heading>Wallet not connected</Heading>
    </Flex>
  );
};

export default Send;
