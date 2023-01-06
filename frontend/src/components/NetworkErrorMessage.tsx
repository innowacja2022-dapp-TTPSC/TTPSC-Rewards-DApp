import React from "react";
import { ReactElement } from "react";

type Props ={
    message: string;
    dismiss: () => void;
}

export const NetworkErrorMessage = ({message, dismiss}:Props):ReactElement => {
    return (
        <div className="alert alert-danger" role="alert">
            {message}
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
