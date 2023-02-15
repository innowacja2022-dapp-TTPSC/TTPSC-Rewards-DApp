import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { usePaymnetManagerService } from "@services/PaymentManagerService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

const SendForm = (): ReactElement => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentRequestReason, setPaymentRequestReason] = useState("");

  const paymentManagerService = usePaymnetManagerService();
  const { mutate } = useMutation(paymentManagerService._createPaymentRequest);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(
      {
        address,
        amount,
        paymentRequestReason,
      },
      {
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send the request",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: "Whooo",
            description: "The request was sent",
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
      <Center minH="20ch">
        <Heading as="h2">
          Send
          <Container color="pink.500" display="inline">
            TTPSC
          </Container>
          tokens to anyone
        </Heading>
      </Center>
      <Flex
        borderBottomRadius="2xl"
        justifyContent="space-between"
        px="10"
        py="4"
      >
        <Spacer />
        <Stack minW="30em" spacing={5}>
          <Text fontWeight="semibold">Address</Text>
          <Input
            onChange={(value) => setAddress(value.target.value)}
            placeholder="Recipient account address"
            value={address}
          />
          <Text fontWeight="semibold">Amount</Text>
          <NumberInput
            onChange={(value) => setAmount(Number(value))}
            placeholder="Enter amount"
            precision={2}
            value={amount}
            w="full"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Text fontWeight="semibold">Request reson</Text>
          <Textarea
            onChange={(value) => setPaymentRequestReason(value.target.value)}
            placeholder="A brief description of the transaction"
            value={paymentRequestReason}
          />

          <Button
            _hover={{ bgColor: "purple.400" }}
            bgColor="purple.500"
            borderRadius="2xl"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            onClick={handleSubmit}
            textColor="white"
          >
            Send
          </Button>
        </Stack>
        <Spacer />
      </Flex>
    </>
  );
};

export default SendForm;
