import { Container, Flex, Heading } from "@chakra-ui/react";
import { ReactElement } from "react";

export const ConnectYourWallet = (): ReactElement => {
  return (
    <Flex alignItems="center" h="full" justifyContent="center" w="full">
      <Heading>
        Please connect your
        <Container color="pink.500" display="inline">
          wallet
        </Container>
        to enjoy all the functionalities
      </Heading>
    </Flex>
  );
};
