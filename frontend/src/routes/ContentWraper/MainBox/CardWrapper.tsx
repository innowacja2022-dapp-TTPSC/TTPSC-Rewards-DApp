import { Box, Center, Container, Flex, Heading, Image, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import { useWalletService } from "@services/WalletService";
import { ReactElement } from "react";
import { AwardCard } from "./AwardCard";

export const CardWrapper = (): ReactElement => {
    return (
        <>
            <Container maxW="150ch" centerContent>
                <Wrap spacing='70px' justify='center'>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                    <WrapItem>
                        <Center w='300px' h='300px'>
                            <AwardCard title="Allegro 50PLN" value="5,00" description="Allegro gift card" image="https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl" />
                        </Center>
                    </WrapItem>
                </Wrap>
            </Container>
        </>

    );
};
