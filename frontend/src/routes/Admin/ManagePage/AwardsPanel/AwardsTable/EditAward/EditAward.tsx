import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
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
import {
  Awards,
  useRewardManagerService,
} from "@services/RewardManagerService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

type Props = {
  award: Awards;
};

export const EditAward = ({ award }: Props): ReactElement => {
  const rewardManagerService = useRewardManagerService();

  const [amount, setAmount] = useState(award.inStock);
  const [price, setPrice] = useState(award.price);

  const { mutate, isLoading } = useMutation(rewardManagerService._editReward);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(
      {
        oldAward: award,
        newAward: { ...award, inStock: amount, price: price },
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to change the award",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: "Whooo",
            description: "The award has been changed",
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
      <IconButton
        aria-label="Edit"
        icon={<EditIcon />}
        onClick={onOpen}
        variant="secondary"
      />

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
                  <Text h="10">Amount:</Text>
                </Flex>
                <Flex flexDir="column" gap="4">
                  <NumberInput
                    onChange={(value) => setAmount(Number(value))}
                    placeholder="10"
                    value={amount}
                  >
                    <NumberInputField />
                  </NumberInput>
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
