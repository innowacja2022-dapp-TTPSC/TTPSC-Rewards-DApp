import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Image, Text, propNames, Flex, Box, Spacer } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
    title: string;
    description: string;
    value: string;
    image: string;
}

const currency = 'MHT';

export const AwardCard = ({ title = 'Award', description = 'Awesome award', value = '0,00', image }: Props): ReactElement => {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={image}
                    alt='Green double couch with wooden legs'
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
                        <Button variant='solid' colorScheme='blue'>
                            Redeem
                        </Button>
                    </ButtonGroup>
                </Box>
            </Flex>


        </Card>
    )
};