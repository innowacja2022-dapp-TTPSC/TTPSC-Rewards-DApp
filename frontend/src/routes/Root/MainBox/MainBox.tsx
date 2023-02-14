import { Box, Center, Container, Flex, Heading } from "@chakra-ui/react";
import { useRewardManagerService } from "@services/RewardManagerService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { CardWrapper } from "./CardWrapper";
import { MainLoading } from "./MainLoading/MainLoading";

export const MainBox = (): ReactElement => {
  const rewardManagerService = useRewardManagerService();
  const quer = useQuery(
    rewardManagerService.rewardKey(),
    rewardManagerService._getAllRewards
  );
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
      <Flex justifyContent="space-between" px="10" py="4">
        {quer.status === "loading" ? (
          <MainLoading />
        ) : quer.status === "success" ? (
          <CardWrapper data={quer.data} />
        ) : (
          <Box> Error</Box>
        )}
      </Flex>
    </>
  );
};
