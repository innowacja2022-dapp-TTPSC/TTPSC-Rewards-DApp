import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { HireEmployee } from "./HireEmployee/HireEmployee";

const UsersPanel = (): ReactElement => {
  return (
    <Flex>
      <HireEmployee />
    </Flex>
  );
};

export default UsersPanel;
