import { Stack, InputGroup, InputLeftElement, Input, InputRightElement, CheckboxIcon, Textarea, Button, Center, Container, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ReactElement } from "react";

const SendForm = (): ReactElement => {
    return <>
        <Center minH="20ch" maxW="150ch">
            <Heading as="h2">
                Send
                <Container color="blue.500" display="inline">
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
            <Stack spacing={5} minW="30em">
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='@'
                    />
                    <Input type='tel' placeholder='Recipient account address' />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='$'
                    />
                    <Input placeholder='Enter amount' />
                    <InputRightElement children={<CheckboxIcon color='green.500' />} />
                </InputGroup>
                <InputGroup>

                    <Textarea placeholder='A brief description of the transaction' />
                </InputGroup>

                <Button
                    _hover={{ bgColor: "purple.400" }}
                    bgColor="purple.500"
                    borderRadius="2xl"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                    onClick={() => {
                        // TODO: Sending token
                        console.log("Token send request");
                    }}
                    textColor="white"
                >
                    Send
                </Button>
            </Stack>
            <Spacer />
        </Flex>
    </>;
};

export default SendForm;