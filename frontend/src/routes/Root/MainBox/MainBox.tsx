import { Center, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ReactElement } from "react";
import { CardWrapper } from "./CardWrapper";

export const MainBox = (): ReactElement => {
  return (
    <>
      <Center minH="10ch">
        <Heading as="h2">
          Redeem
          <Container color="blue.500" display="inline">
            TTPSC
          </Container>
          tokens for any rewards
        </Heading>
      </Center>
      <Flex justifyContent="space-between" px="10" py="4">
        <Spacer />
        <CardWrapper />
        <Spacer />
      </Flex>
    </>
  );
};
