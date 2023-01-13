import { ReactElement } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useAnonWalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";

export const ConnectWallet = (): ReactElement => {
  const anonService = useAnonWalletService();
  const { mutate, isError } = useMutation(anonService._connectWallet);

  const handleConnection = () => {
    mutate();
  };

  return (
    <>
      {isError && <Box>Error</Box>}

      <Button
        _hover={{ bgColor: "purple.400" }}
        bgColor="purple.500"
        borderRadius="2xl"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        onClick={() => handleConnection()}
        textColor="white"
      >
        Connect Wallet
      </Button>
    </>
  );
};
