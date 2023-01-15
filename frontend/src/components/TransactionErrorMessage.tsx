import { ReactElement } from "react";

type Props = {
  dismiss: () => void;
  message: string;
};

export const TransactionErrorMessage = ({
  message,
  dismiss,
}: Props): ReactElement => {
  return (
    <div className="alert alert-danger" role="alert">
      Error sending transaction: {message.substring(0, 100)}
      <button
        aria-label="Close"
        className="close"
        data-dismiss="alert"
        onClick={dismiss}
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
