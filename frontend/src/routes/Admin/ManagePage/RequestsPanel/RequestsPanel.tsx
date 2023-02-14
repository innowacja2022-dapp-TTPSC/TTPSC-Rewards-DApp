import { TableError } from "@components/TableError/TableError";
import { tableHead, TableLoading } from "@components/TableLoading/TableLoading";
import { usePaymnetManagerService } from "@services/PaymentManagerService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { RequestTable } from "./RequestTable/RequestTable";

const RequestPanel = (): ReactElement => {
  const paymentManagerService = usePaymnetManagerService();
  const quer = useQuery(
    paymentManagerService.requestKey(),
    paymentManagerService._getAllRequests
  );

  if (quer.status === "loading") {
    return <TableLoading columns={5} tableHead={tableHead.transactionsHead} />;
  }
  if (quer.status === "success") {
    return <RequestTable data={quer.data} />;
  }
  return <TableError />;
};

export default RequestPanel;
