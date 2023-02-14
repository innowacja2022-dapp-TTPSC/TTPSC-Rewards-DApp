import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRewardManagerService } from "@services/RewardManagerService";
import { useMutation } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { ReactElement, useState } from "react";

export const AddAward = (): ReactElement => {
  const rewardManagerService = useRewardManagerService();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<Buffer>();
  const [isInvalid, setIsInvalid] = useState(false);
  const handleImage = (file: FileList | null) => {
    if (file === null) {
      return;
    }
    const data = file[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      if (reader.result && typeof reader.result != "string") {
        setImage(Buffer.from(reader.result));
      }
    };
  };
  const { mutate } = useMutation(rewardManagerService._addReward);
  const toast = useToast();
  const handleSubmit = () => {
    if (name === "") {
      setIsInvalid(true);
      return;
    }
    mutate(
      {
        amount: amount,
        image: image,
        name: name,
        price: price,
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
        Add
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Flex gap="4">
              <Flex flexDir="column" gap="4">
                <Text h="10">Name:</Text>
                <Text h="10">Amount:</Text>
                <Text h="10">Price:</Text>
                <Text h="10">Image:</Text>
              </Flex>
              <Flex flexDir="column" gap="4">
                <Input
                  isInvalid={isInvalid}
                  onChange={(value) => setName(value.target.value)}
                  placeholder="Gift card"
                  value={name}
                />
                <NumberInput
                  onChange={(value) => setAmount(Number(value))}
                  placeholder="10"
                  value={amount}
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  onChange={(value) => setPrice(Number(value))}
                  placeholder="2.5"
                  value={price}
                >
                  <NumberInputField />
                </NumberInput>

                <Input
                  accept="image/png, image/jpeg"
                  onChange={(value) => handleImage(value.target.files)}
                  type="file"
                />
              </Flex>
            </Flex>
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
