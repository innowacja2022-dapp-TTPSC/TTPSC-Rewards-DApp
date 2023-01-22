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
} from "@chakra-ui/react";
import { Transactions } from "@services/PaymentManagerService";
import { ReactElement, useState } from "react";

type Props = {
  transaction: Transactions;
};

const Received = ({ transaction }: Props): ReactElement => {
  const [value, setValue] = useState(1);
  const handleChange = (value: number) => {
    setValue(value);
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
                transaction.reward +
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
            <Button variant="secondary">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Received;
