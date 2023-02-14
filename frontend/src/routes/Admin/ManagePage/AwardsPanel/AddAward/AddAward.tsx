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
import { Loading } from "@routes/ContentWraper/TopBar/ConnectWallet/Loading/Loading";
import { useRewardManagerService } from "@services/RewardManagerService";
import { useMutation } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { ReactElement, useState } from "react";

export const AddAward = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const { mutate, isLoading } = useMutation(rewardManagerService._addReward);
  const toast = useToast();
  const handleSubmit = () => {
    if (name === "") {
      setIsInvalid(true);
      return;
    }
    mutate(
      {
        inStock: amount,
        image: image,
        name: name,
        price: price,
      },
      {
        onError: () => {
          onClose();
          toast({
            title: "Error",
            description: "Failed to add the award",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          onClose();
          toast({
            title: "Whooo",
            description: "The award has been added",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <>
      <Button onClick={onOpen} variant="secondary">
        Add award
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : (
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
                    defaultValue={1}
                    onChange={(value) => setAmount(Number(value))}
                    value={amount}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <NumberInput
                    defaultValue={1}
                    onChange={(value) => setPrice(Number(value))}
                    precision={2}
                    step={0.01}
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
            )}
          </ModalBody>
          {!isLoading && (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} variant="secondary">
                Submit
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
