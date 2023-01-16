import { WarningIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
  error: TypeError;
};

export const Error = ({ error }: Props): ReactElement => {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      gap="4"
      justifyContent="center"
      p="8"
    >
      <WarningIcon color="red.600" h="16" w="16" />
      <Heading w="fit-content">An error has occured</Heading>
      <Text>{error.message}</Text>
    </Flex>
  );
};
