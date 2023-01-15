import { Box, Center, Container, Wrap, WrapItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import { AwardCard } from "./AwardCard";

const cardData = {
  title: "Allegro 50PLN",
  value: "5,00",
  description: "Allegro gift card",
  image:
    "https://a.allegroimg.com/s720/03444d/5fbfc8ff4da986b370a7d62997c3/Karta-Podarunkowa-Prezent-50-zl",
};

export const CardWrapper = (): ReactElement => {
  return (
    <>
      <Container centerContent maxW="150ch">
        <Wrap justify="center" spacing="70px">
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <AwardCard
                description={cardData.description}
                image={cardData.image}
                title={cardData.title}
                value={cardData.value}
              />
            </Center>
          </WrapItem>
          <Box h="100px" w="100%" />
        </Wrap>
      </Container>
    </>
  );
};
