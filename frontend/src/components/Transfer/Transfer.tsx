import { ethers } from "ethers";
import { ChangeEvent, ReactElement, useState } from "react";
import { _transferTokens } from "./Transfer.utils";

type Props = {
  _token: ethers.Contract;
  from: string;
  tokenSymbol: string;
};

export const Transfer = ({
  tokenSymbol,
  from,
  _token,
}: Props): ReactElement => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const hangleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };
  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          if (to && amount) {
            _transferTokens(to, amount, _token, from);
          }
        }}
      >
        <div className="form-group">
          <label>Amount of {tokenSymbol}</label>
          <input
            className="form-control"
            name="amount"
            onChange={hangleAmountChange}
            placeholder="1"
            required
            step="1"
            type="number"
            value={amount}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">Recipient address</label>
          <input
            className="form-control"
            name="to"
            onChange={handleToChange}
            required
            type="text"
            value={to}
          />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  );
};
