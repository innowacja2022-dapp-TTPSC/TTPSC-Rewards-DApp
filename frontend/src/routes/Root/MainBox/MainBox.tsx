import { Box, Container, Flex, Heading } from "@chakra-ui/react";
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
    <Flex alignItems="center" flexDir="column" gap="10" p="10">
      <Heading as="h2">
        Redeem
        <Container color="pink.500" display="inline">
          TTPSC
        </Container>
        tokens for any rewards
      </Heading>

      <Flex justifyContent="center" px="10" py="4">
        {quer.status === "loading" ? (
          <>
            <MainLoading />
            <MainLoading />
            <MainLoading />
            <MainLoading />
            <MainLoading />
            <MainLoading />
          </>
        ) : quer.status === "success" ? (
          <CardWrapper data={quer.data} />
        ) : (
          <Box> Error</Box>
        )}
      </Flex>
    </Flex>
  );
};
