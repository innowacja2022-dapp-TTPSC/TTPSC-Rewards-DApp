import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { WalletService } from "@services/WalletService";
import { ReactElement, useContext, useEffect, useState } from "react";

type Props = {
  description: string;
  image: string;
  title: string;
  value: string;
};

const currency = "TTPSC";

export const AwardCard = ({
  title,
  description,
  value,
  image,
}: Props): ReactElement => {
  const context = useContext(WalletService);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (context.status === "auth") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [context.status]);
  return (
    <Card bgColor="white" maxW="xs">
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
