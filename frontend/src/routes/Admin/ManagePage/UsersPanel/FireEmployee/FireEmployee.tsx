import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { usePaymnetManagerService } from "@services/PaymentManagerService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

export const FireEmployee = (): ReactElement => {
  const [address, setAddress] = useState("");
  const paymentManagerService = usePaymnetManagerService();
  const { mutate } = useMutation(paymentManagerService.fireEmployee);
  const toast = useToast();
  const handleSubmit = () => {
    mutate(address, {
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
    });
  };
  return (
    <Flex alignItems="center" gap="4" justifyContent="center">
      <Text fontWeight="semibold">Fire Employee</Text>
      <Flex gap="2">
        <Input
          onChange={(value) => setAddress(value.target.value)}
          placeholder="0x46A4FA36a08e583f26Daf2eac9121d839E428Dfac"
          value={address}
          w="96"
        />
        <Button onClick={handleSubmit}>Fire</Button>
      </Flex>
    </Flex>
  );
};
