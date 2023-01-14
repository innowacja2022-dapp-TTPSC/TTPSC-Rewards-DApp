import { Box, Center, Container, Flex, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { AwardCard } from "./AwardCard";

export const MainBox = (): ReactElement => {
    const status = useWalletService();
    return (
        <>
            <Box h="10ch"></Box>
            <Flex
                borderBottomRadius="2xl"
                justifyContent="space-between"
                px="10"
                py="4"
            >
                <Spacer />
                <Container maxW="150ch" centerContent>
                    <Wrap spacing='30px' justify='center'>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                        <WrapItem>
                            <Center w='350px' h='360px'>
                                <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                            </Center>
                        </WrapItem>
                    </Wrap>
                </Container>

                <Spacer />

            </Flex>
        </>

    );
};
