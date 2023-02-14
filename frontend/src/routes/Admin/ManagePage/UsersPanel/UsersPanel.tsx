import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FireEmployee } from "./FireEmployee/FireEmployee";
import { HireEmployee } from "./HireEmployee/HireEmployee";
import { HireEmployer } from "./HireEmployer/HireEmployer";

const UsersPanel = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      gap="12"
      h="full"
      justifyContent="center"
    >
      <HireEmployee />
      <HireEmployer />
      <FireEmployee />
    </Flex>
  );
};

export default UsersPanel;
