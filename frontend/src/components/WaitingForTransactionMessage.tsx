import React, { ReactElement } from "react";

type Props = {
    txHash: string;
}

export const WaitingForTransactionMessage = ({ txHash }:Props): ReactElement => {
  return (
    <div className="alert alert-info" role="alert">
      Waiting for transaction <strong>{txHash}</strong> to be mined
    </div>
  );
};
