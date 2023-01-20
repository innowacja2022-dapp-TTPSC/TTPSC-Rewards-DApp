import { useAuthWalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";
import PopoverMenu from "./PopoverMenu/PopoverMenu";

export const DisconnectWallet = (): ReactElement => {
  const authService = useAuthWalletService();
  const { mutate } = useMutation(authService._disconnectWallet);
  const walletAddress = authService._getAddress();
  const handleDisconnect = () => {
    mutate();
  };
  return (
    <PopoverMenu disconnectFunction={handleDisconnect} walletAddress={walletAddress} />
  );
};
