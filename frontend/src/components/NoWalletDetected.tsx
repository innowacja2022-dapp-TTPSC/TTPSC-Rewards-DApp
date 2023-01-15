import { ReactElement } from "react";

export const NoWalletDetected = (): ReactElement => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a
              href="http://metamask.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              MetaMask
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
