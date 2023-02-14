import { TableError } from "@components/TableError/TableError";
import { tableHead, TableLoading } from "@components/TableLoading/TableLoading";
import { useRewardManagerService } from "@services/RewardManagerService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { AwardsTable } from "./AwardsTable/AwardsTable";

const AwardsPanel = (): ReactElement => {
  const rewardManagerService = useRewardManagerService();
  const quer = useQuery(
    rewardManagerService.rewardKey(),
    rewardManagerService._getAllRewards
  );

  if (quer.status === "loading") {
    return <TableLoading columns={5} tableHead={tableHead.transactionsHead} />;
  }
  if (quer.status === "success") {
    return <AwardsTable data={quer.data} />;
  }
  return <TableError />;
};

export default AwardsPanel;
