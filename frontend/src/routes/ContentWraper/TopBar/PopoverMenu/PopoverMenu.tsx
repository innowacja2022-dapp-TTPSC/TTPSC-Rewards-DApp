import { CloseIcon, CopyIcon } from '@chakra-ui/icons';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal,
    Button,
    Box,
    Flex,
    Spacer,
    Text,
    Center,
} from '@chakra-ui/react';
import { messagePrefix } from '@ethersproject/hash';
import { ReactElement } from "react";

type Props = {
    disconnectFunction: Function;
    walletAddress: String;
};

const daytimeBasedMessage = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
        return 'Good morning!';
    } else if (curHr < 18) {
        return 'Good afternoon!';
    } else {
        return 'Good evening!';
    }
}


export const commonButtonWidth = '300px';

export const PopoverMenu = ({ disconnectFunction, walletAddress }: Props): ReactElement => {

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        _hover={{ bgColor: "purple.400" }}
                        bgColor="purple.500"
                        borderRadius="2xl"
                        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                        textColor="white"
                        minWidth={commonButtonWidth}
                    >
                        {daytimeBasedMessage()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    bgColor="purple.500"
                    borderRadius="2xl"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                    textColor="white"
                    border="none"
                    maxWidth={commonButtonWidth} >
                    <PopoverHeader >
                        <Flex alignItems='center'>
                            <Box w="40px" h="40px" borderRadius="50px" bgColor="black">
                            </Box>
                            <Text fontWeight='semibold' fontSize="15px" paddingLeft="10px" maxWidth="150px" style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{walletAddress}</Text>
                            <Spacer />
                            <Box>
                                <Button
                                    maxW="20px"
                                    fontSize="13px"
                                    bg='pink.700'
                                    onClick={() => console.log("Copy")}>
                                    <CopyIcon />
                                </Button>
                                <Button
                                    maxW="20px"
                                    fontSize="13px"
                                    bg='pink.700'
                                    onClick={() => disconnectFunction()}
                                    marginLeft="5px"
                                >
                                    <CloseIcon />
                                </Button>
                            </Box>

                        </Flex>
                    </PopoverHeader>
                    <PopoverBody textAlign='center'>
                        <Text fontWeight='semibold' fontSize="22px" paddingLeft="10px" w='100%'>TTPSC Balance</Text>
                        {/* TODO: Set correct TTPSC Account balance */}
                        <Text fontWeight='bold' fontSize="20px" paddingLeft="10px" w='100%'>0,00</Text>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
};

export default PopoverMenu;
