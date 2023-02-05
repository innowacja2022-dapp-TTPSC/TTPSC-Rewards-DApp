import { Flex } from "@chakra-ui/react";
import { NoWalletDetected } from "@components/NoWalletDetected";
import { ReactElement, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import icon from "./icon.svg";
import { TopBar } from "./TopBar/TopBar";

export const ContentWrapper = (): ReactElement => {
  const [hasWallet, setHasWallet] = useState(window.ethereum);
  useEffect(() => {
    if (window.ethereum !== undefined) {
      setHasWallet(true);
    }
  }, []);
  return (
    <Flex
      bgImage={icon}
      bgPosition="right"
      bgRepeat="no-repeat"
      flexDirection="column"
      h="100vh"
      zIndex="hide"
    >
      <TopBar />
      {hasWallet === undefined ? <NoWalletDetected /> : <Outlet />}
    </Flex>
  );
};
