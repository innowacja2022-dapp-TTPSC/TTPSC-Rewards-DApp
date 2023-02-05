import { TableError } from "@components/TableError/TableError";
import { usePaymentRequestService } from "@services/PaymentRequestService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { VoteTable } from "./VoteTable/VoteTable";

const Send = (): ReactElement => {
  const paymentManagerSerivce = usePaymentRequestService();
  const quer = useQuery(
    paymentManagerSerivce.listKey(),
    paymentManagerSerivce._getPaymentRequestHistory
  );

  if (quer.status === "success") {
    return <VoteTable data={quer.data} />;
  }
  return <TableError />;
};

export default Send;
