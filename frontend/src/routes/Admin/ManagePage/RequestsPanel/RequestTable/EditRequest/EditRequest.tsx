import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Requests,
  usePaymnetManagerService,
} from "@services/PaymentManagerService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

type Props = {
  request: Requests;
};

export const EditRequest = ({ request }: Props): ReactElement => {
  const paymentManagerService = usePaymnetManagerService();

  const [status, setStatus] = useState(request.status);
  const [decisionReason, setDecisionReason] = useState(request.decisionReason);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "ACCEPTED") {
      setStatus(1);
    } else {
      setStatus(2);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useMutation(paymentManagerService.changeRequestStatus);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(
      {
        ...request,
        status,
        decisionReason,
      },
      {
        onError: () => {
          onClose();
          toast({
            title: "Error",
            description: "Failed to edit the request",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          onClose();
          toast({
            title: "Whooo",
            description: "The request has been edited",
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
            <Flex gap="4">
              <Flex flexDir="column" gap="4">
                <Text h="10">Status:</Text>
                <Text h="10">Decision Reason:</Text>
              </Flex>
              <Flex flexDir="column" gap="4">
                <Select
                  onChange={(value) => handleStatusChange(value)}
                  placeholder="Pending"
                  value={status}
                >
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </Select>

                <Input
                  onChange={(value) => setDecisionReason(value.target.value)}
                  value={decisionReason}
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
