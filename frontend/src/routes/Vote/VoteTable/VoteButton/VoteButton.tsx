import { PaymentRequestServiceValue } from "@services/PaymentRequestService";
import { Fragment, ReactElement } from "react";
import {Button} from "@chakra-ui/react"
type Props = {
    paymentRequestService: PaymentRequestServiceValue;
}

export const VoteButton = ({paymentRequestService}: Props):ReactElement => {
    
    return (
        <Button> Vote </Button>
    )
}