import { Button, Text } from "@chakra-ui/react";
import { useAuthWalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

export const DisconnectWallet = (): ReactElement => {
  const authService = useAuthWalletService();
  const { mutate } = useMutation(authService._disconnectWallet);
  const walletAddress = authService._getAddress();
  const handleDisconnect = () => {
    mutate();
  };
  return (
    <Button
      _hover={{ bgColor: "purple.400" }}
      bgColor="purple.500"
      borderRadius="2xl"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      maxW="36"
      onClick={() => handleDisconnect()}
      textColor="white"
    >
      <Text noOfLines={1}>{walletAddress}</Text>
    </Button>
  );
};
