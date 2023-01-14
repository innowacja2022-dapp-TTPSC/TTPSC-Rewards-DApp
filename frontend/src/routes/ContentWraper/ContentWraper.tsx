import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar/TopBar";
import { MainBox } from "./MainBox/MainBox";

export const ContentWrapper = (): ReactElement => {
  return (
    <Flex flexDirection="column" h="100vh">
      <TopBar />
      <Outlet />
    </Flex>
  );
};
