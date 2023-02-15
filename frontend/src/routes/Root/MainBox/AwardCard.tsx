import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RewardManagerServiceValue } from "@services/RewardManagerService";
import { WalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
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
  const { mutate, isLoading } = useMutation(rewardManagerService.placeOrder);
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
  const { onClose } = useDisclosure();

  return (
    <>
      <Modal
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isCentered
        isOpen={isLoading}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalBody>
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              p="8"
            >
              <Spinner
                color="purple.500"
                size="xl"
                speed="0.65s"
                thickness="4px"
              />
              <Heading>Loading</Heading>
              <Text>Approve this transaction in your wallet app</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Card bgColor="white" w="xs">
        <CardBody m="auto">
          <Image
            alt={`values ${value} ${currency}.`}
            borderRadius="lg"
            boxSize="2xs"
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
              {parseFloat(ethers.utils.formatEther(value))} {currency}
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
    </>
  );
};
