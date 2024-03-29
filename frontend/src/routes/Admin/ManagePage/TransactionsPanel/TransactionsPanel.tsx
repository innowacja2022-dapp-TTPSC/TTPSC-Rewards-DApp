import { TableError } from "@components/TableError/TableError";
import { tableHead, TableLoading } from "@components/TableLoading/TableLoading";
import { useRewardManagerService } from "@services/RewardManagerService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { TransactionTable } from "./TransactionTable/TransactionTable";

const TransactionsPanel = (): ReactElement => {
  const rewardManagerService = useRewardManagerService();
  const quer = useQuery(
    rewardManagerService.listKey(),
    rewardManagerService._getTransactionData,
    { cacheTime: 10 * 60 * 1000 }
  );

  if (quer.status === "loading") {
    return <TableLoading columns={4} tableHead={tableHead.transactionsHead} />;
  }
  if (quer.status === "success") {
    return <TransactionTable data={quer.data} />;
  }
  return <TableError />;
};

export default TransactionsPanel;
