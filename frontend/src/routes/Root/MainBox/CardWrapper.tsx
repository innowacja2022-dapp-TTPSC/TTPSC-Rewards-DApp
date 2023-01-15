import { Box, Center, Container, Flex, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
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
      <Flex flexWrap="wrap" gap="8" justify="center" maxW="1300px">
        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />

        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />

        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />

        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />

        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />

        <AwardCard
          description={cardData.description}
          image={cardData.image}
          title={cardData.title}
          value={cardData.value}
        />
      </Flex>

    </>
  );
};
