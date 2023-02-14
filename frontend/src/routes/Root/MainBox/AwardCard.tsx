import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RewardManagerServiceValue } from "@services/RewardManagerService";
import { WalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useContext, useEffect, useState } from "react";

type Props = {
  id: number;
  image: string;
  rewardManagerService: RewardManagerServiceValue;
  title: string;
  value: string;
};

const currency = "TTPSC";

export const AwardCard = ({
  title,
  value,
  image,
  rewardManagerService,
  id,
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
  const { mutate } = useMutation(rewardManagerService.placeOrder);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(
      { id, value },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to collect the reward",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: "Whooo",
            description: "The reward has been collected",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };
  return (
    <Card bgColor="white" maxW="xs">
      <CardBody>
        <Image
          alt={`values ${value} ${currency}.`}
          borderRadius="lg"
          boxSize="3xs"
          objectFit="cover"
          src={image}
        />
        <Stack mt="6" spacing="3" textAlign="center">
          <Heading size="md">{title}</Heading>
        </Stack>
      </CardBody>
      <Divider />
      <Flex>
        <Box p="4">
          <Text color="pink.600" fontSize="2xl" fontWeight="semibold">
            {value} {currency}
          </Text>
        </Box>
        <Spacer />
        <Box p="4">
          <Button isDisabled={isDisabled} onClick={handleSubmit}>
            Redeem
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};
