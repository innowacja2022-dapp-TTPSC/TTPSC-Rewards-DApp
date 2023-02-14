import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  RewardManagerServiceValue,
  Transactions,
} from "@services/RewardManagerService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

type Props = {
  rewardManagerService: RewardManagerServiceValue;
  transaction: Transactions;
};

export const Received = ({
  transaction,
  rewardManagerService,
}: Props): ReactElement => {
  const [value, setValue] = useState(1);
  const handleChange = (value: number) => {
    setValue(value);
  };
  const { mutate } = useMutation(rewardManagerService._markCollected);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(
      {
        address: transaction.address,
        quantity: Number(transaction.quantity),
        id: transaction.id,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to collect the award",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: "Whooo",
            description: "The award has been collected",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="secondary">
        Received
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Text fontSize="lg" fontWeight="semibold" my="4" px="4">
              {"How many " +
                transaction.rewardId +
                " have you given out to " +
                transaction.address +
                "?"}
            </Text>
            <Text fontWeight="semibold" px="4" py="2">
              Quantity
            </Text>
            <NumberInput
              defaultValue={1}
              max={Number(transaction.quantity)}
              min={1}
              mx="4"
              onChange={(value) => handleChange(Number(value))}
              value={value}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant="secondary">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
