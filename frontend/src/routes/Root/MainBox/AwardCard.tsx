import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";

type Props = {
  description: string;
  image: string;
  title: string;
  value: string;
};

const currency = "MHT";

let isDisabled = true;

export const AwardCard = ({
  title,
  description,
  value,
  image,
}: Props): ReactElement => {
  const status = useWalletService();

  if (status === "auth") {
    isDisabled = false;
  }

  return (
    <Card maxW="xs">
      <CardBody>
        <Image
          alt={`${description}, values ${value} ${currency}.`}
          borderRadius="lg"
          src={image}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <Flex>
        <Box p="4">
          <Text color="blue.600" fontSize="2xl">
            {value} {currency}
          </Text>
        </Box>
        <Spacer />
        <Box p="4">
          <ButtonGroup spacing="2">
            <Button colorScheme="blue" isDisabled={isDisabled} variant="solid">
              Redeem
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Card>
  );
};
