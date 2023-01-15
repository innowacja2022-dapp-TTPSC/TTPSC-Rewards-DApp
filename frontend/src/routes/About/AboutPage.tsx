import {
  Stack,
  Text,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ReactElement } from "react";

const AboutPage = (): ReactElement => {
  return (
    <>
      <Center minH="20ch">
        <Heading as="h6">
          The future of
          <Container color="blue.500" display="inline">
            receiving rewards
          </Container>
          is here!
        </Heading>
      </Center>
      <Flex
        borderBottomRadius="2xl"
        justifyContent="space-between"
        px="10"
        py="4"
      >
        <Spacer />
        <Stack maxW="40em" spacing={5}>
          <Image
            alt="Dan Abramov"
            borderRadius="20"
            src="https://img.freepik.com/darmowe-wektory/izometryczne-wydobywanie-kryptowaluty_107791-249.jpg?w=1380&t=st=1673736180~exp=1673736780~hmac=989beadd9d7c9601bb749c45f26f6f1f8bb6000f6cbcc8bffecd71cc8ca827a9"
          />
          <Spacer />

          <Heading as="h5" fontSize="20" textAlign="center">
            Let us explain
          </Heading>
          <Divider />
          <Text>
            Welcome to our decentralized blockchain application (DAPP), where
            you can earn <b>$TTPSC</b> tokens and exchange them for real rewards
            such as gift cards, subscription cards, and discounts.
          </Text>

          <Heading as="h5" fontSize="20" textAlign="center">
            Behind the scenes
          </Heading>
          <Divider />
          <Text>
            Our application uses blockchain technology to create a transparent,
            secure, and decentralized platform where you can earn rewards. By
            removing the need for a central authority we ensure that all
            transactions are fair and accurate. Additionally, our platform uses
            smart contracts to ensure all transactions are secure, reducing the
            risk of fraud or errors. Overall, our decentralized blockchain
            application offers a more transparent, secure, and scalable rewards
            program. We hope you will join us in taking advantage of the
            benefits of blockchain technology!
          </Text>
        </Stack>
        <Spacer />
      </Flex>
      <Container minH="50px" />
    </>
  );
};

export default AboutPage;
