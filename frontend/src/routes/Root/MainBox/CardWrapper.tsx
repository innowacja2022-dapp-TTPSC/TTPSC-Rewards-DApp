import { Flex } from "@chakra-ui/react";
import {
  Awards,
  useRewardManagerService,
} from "@services/RewardManagerService";
import { ReactElement } from "react";
import { AwardCard } from "./AwardCard";

type Props = {
  data: Awards[];
};

export const CardWrapper = ({ data }: Props): ReactElement => {
  const rewardManagerService = useRewardManagerService();

  return (
    <Flex flexWrap="wrap" gap="8" justify="center">
      {data.map((award) => {
        return (
          <AwardCard
            id={award.id}
            image={award.imgHash}
            key={award.id}
            rewardManagerService={rewardManagerService}
            title={award.name}
            value={award.price.toString()}
          />
        );
      })}
    </Flex>
  );
};
