import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAnonWalletService } from "@services/WalletService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { commonButtonWidth } from "../../Menu/PopoverMenu/PopoverMenu";
import { Error } from "./Error/Error";
import { Loading } from "./Loading/Loading";

export const ConnectWallet = (): ReactElement => {
  const anonService = useAnonWalletService();
  const [error, setError] = useState<TypeError | undefined>(undefined);
  const { mutate, isLoading } = useMutation(anonService._connectWallet, {
    onError: (err: TypeError) => {
      setError(err);
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleConnection = () => {
    mutate();
    onOpen();
  };
  return (
    <>
      <Button
        _hover={{ bgColor: "purple.400" }}
        bgColor="purple.500"
        borderRadius="2xl"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        textColor="white"
        minWidth={commonButtonWidth}
        onClick={() => handleConnection()}
      >
        Connect Wallet
      </Button>
      <Modal
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalBody>
            {isLoading ? <Loading /> : error && <Error error={error} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
