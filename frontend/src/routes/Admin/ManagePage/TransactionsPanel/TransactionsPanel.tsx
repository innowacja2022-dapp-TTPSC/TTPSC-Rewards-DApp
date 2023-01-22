import { TableError } from "@components/TableError/TableError";
import { tableHead, TableLoading } from "@components/TableLoading/TableLoading";
import { usePaymentManagerService } from "@services/PaymentManagerService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { TransactionTable } from "./TransactionTable/TransactionTable";

const TransactionsPanel = (): ReactElement => {
  const paymentManagerService = usePaymentManagerService();
  const quer = useQuery(
    paymentManagerService.listKey(),
    paymentManagerService._getTransactionData
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
