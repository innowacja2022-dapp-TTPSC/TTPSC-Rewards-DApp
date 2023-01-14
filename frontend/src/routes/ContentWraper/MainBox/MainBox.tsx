import { Box, Center, Container, Flex, Heading, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { AwardCard } from "./AwardCard";
import { CardWrapper } from "./CardWrapper";

export const MainBox = (): ReactElement => {
    const status = useWalletService();
    return (
        <>
            <Center minH="10ch">
                <Heading as="h2">
                    Redeem
                    <Container color="blue.500" display="inline">
                        TTPSC
                    </Container>
                    tokens for any rewards
                </Heading>
            </Center>
            <Flex
                borderBottomRadius="2xl"
                justifyContent="space-between"
                px="10"
                py="4"
            >
                <Spacer />
                <CardWrapper />
                <Spacer />
            </Flex>
        </>

    );
};
