import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

export const Loading = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      p="8"
    >
      <Spinner color="purple.500" size="xl" speed="0.65s" thickness="4px" />
      <Heading>Connecting</Heading>
      <Text>Approve this connection in your wallet app</Text>
    </Flex>
  );
};
