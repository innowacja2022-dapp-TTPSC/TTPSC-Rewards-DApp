import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

export const TableError = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap="4"
      h="full"
      justifyContent="center"
      w="full"
    >
      <WarningIcon boxSize={10} color="red.500" />
      <Text fontSize="2xl" fontWeight="semibold">
        An error has occurred please reload the page
      </Text>
    </Flex>
  );
};
