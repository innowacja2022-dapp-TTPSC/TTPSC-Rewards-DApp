import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import icon from "./icon.svg";
import { TopBar } from "./TopBar/TopBar";

export const ContentWrapper = (): ReactElement => {
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
      <Outlet />
    </Flex>
  );
};
