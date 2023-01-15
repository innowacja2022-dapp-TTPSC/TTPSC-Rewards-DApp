import { ReactElement } from "react";

type Props = {
  dismiss: () => void;
  message: string;
};

export const NetworkErrorMessage = ({
  message,
  dismiss,
}: Props): ReactElement => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
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
