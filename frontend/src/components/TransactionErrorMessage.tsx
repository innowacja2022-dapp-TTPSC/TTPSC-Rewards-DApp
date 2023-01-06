import React, { ReactElement } from "react";

type Props = {
    message: string;
    dismiss: () => void;
}

export const TransactionErrorMessage = ({message, dismiss}:Props): ReactElement => {
    return (
        <div className="alert alert-danger" role="alert">
            Error sending transaction: {message.substring(0, 100)}
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={dismiss}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}
