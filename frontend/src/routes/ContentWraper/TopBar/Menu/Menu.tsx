import { useAuthWalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";
import PopoverMenu from "./PopoverMenu/PopoverMenu";

export const Menu = (): ReactElement => {
  const authService = useAuthWalletService();
  const { mutate } = useMutation(authService._disconnectWallet);
  const walletAddress = authService._getAddress();
  const balance = authService._getBallance();
  const handleDisconnect = () => {
    mutate();
  };
  return (
    <PopoverMenu
      balance={balance}
      disconnectFunction={handleDisconnect}
      walletAddress={walletAddress}
    />
  );
};
