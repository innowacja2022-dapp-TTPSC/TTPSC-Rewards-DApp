import { Box, Flex, Image } from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { ConnectWallet } from "./ConnectWallet/ConnectWallet";
import { DisconnectWallet } from "./DisconnectWallet/DisconnectWallet";
import { TopBarLink } from "./TopBarLink/TopBarLink";

export const TopBar = (): ReactElement => {
  const status = useWalletService();
  return (
    <Flex
      bgGradient="linear(to-r, #923086 0.18%, #D03A8C 100%)"
      borderBottomRadius="2xl"
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
      </Flex>
      {status === "anon" ? (
        <Box>
          <ConnectWallet />
        </Box>
      ) : status === "auth" ? (
        <Box>
          <DisconnectWallet />
        </Box>
      ) : undefined}
    </Flex>
  );
};