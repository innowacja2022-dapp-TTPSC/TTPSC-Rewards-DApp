import { Box, Flex, Image } from "@chakra-ui/react";
import { useWalletService, WalletService } from "@services/WalletService";
import { paths } from "@utils/paths";
import { ReactElement, useContext, useEffect, useState } from "react";
import { AdminLink } from "./AdminLink/AdminLink";
import { ConnectWallet } from "./ConnectWallet/ConnectWallet";
import { Menu } from "./Menu/Menu";
import { TopBarLink } from "./TopBarLink/TopBarLink";

export const TopBar = (): ReactElement => {
  const status = useWalletService();
  const context = useContext(WalletService);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (context.status === "auth" && context.wallet.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [context]);
  return (
    <Flex
      bgGradient="linear(to-r, pink.700 0.18%, pink.500 100%)"
      borderBottomRadius="2xl"
      h="20"
      justifyContent="space-between"
      px="10"
      py="4"
    >
      <Flex alignItems="center" gap="10">
        <Box bgColor="gray.700" h="12" w="12">
          <Image src="logo.png" />
        </Box>
        <TopBarLink path={paths.root}>Awards</TopBarLink>
        <TopBarLink path={paths.send}>Send</TopBarLink>
        <TopBarLink path={paths.about}>About</TopBarLink>
        {isAdmin && <AdminLink path={paths.admin}>Manage</AdminLink>}
      </Flex>
      {status === "anon" ? (
        <Box>
          <ConnectWallet />
        </Box>
      ) : status === "auth" ? (
        <Box>
          <Menu />
        </Box>
      ) : undefined}
    </Flex>
  );
};
