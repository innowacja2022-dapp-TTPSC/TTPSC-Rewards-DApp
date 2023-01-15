import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Image, Text, propNames, Flex, Box, Spacer } from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";

type Props = {
    title: string;
    description: string;
    value: string;
    image: string;
}

const currency = 'MHT';

let disabled: boolean = true;

export const AwardCard = ({ title, description, value, image }: Props): ReactElement => {
    const status = useWalletService();

    if (status === "auth") {
        disabled = false;
    }

    return (
        <Card maxW='xs'>
            <CardBody>
                <Image
                    src={image}
                    alt={`${description}, values ${value} ${currency}.`}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text>
                        {description}
                    </Text>

                </Stack>
            </CardBody>
            <Divider />
            <Flex>
                <Box p='4'>
                    <Text color='blue.600' fontSize='2xl'>
                        {value} {currency}
                    </Text>
                </Box>
                <Spacer />
                <Box p='4'>
                    <ButtonGroup spacing='2'>
                        <Button variant='solid' colorScheme='blue' isDisabled={disabled}>
                            Redeem
                        </Button>
                    </ButtonGroup>
                </Box>
            </Flex>


        </Card>
    )
};