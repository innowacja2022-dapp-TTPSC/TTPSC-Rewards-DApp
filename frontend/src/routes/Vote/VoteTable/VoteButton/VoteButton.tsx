import { Button } from "@chakra-ui/react";
import { PaymentRequestServiceValue } from "@services/PaymentRequestService";
import { ReactElement } from "react";
type Props = {
  paymentRequestService: PaymentRequestServiceValue;
};

export const VoteButton = ({ paymentRequestService }: Props): ReactElement => {
  return <Button> Vote </Button>;
};
