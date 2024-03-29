import { ethers } from "ethers";
import { _updateBalance } from "./updateBalance";

export const _startPollingData = (
  _token: ethers.Contract,
  selectedAddress: string
): NodeJS.Timer => {
  const _pollDataInterval = setInterval(
    () => _updateBalance(_token, selectedAddress),
    10000
  );

  // We run it once immediately so we don't have to wait for it

  _updateBalance(_token, selectedAddress);
  return _pollDataInterval;
};

export const _stopPollingData = (
  _pollDataInterval: NodeJS.Timer
): undefined => {
  clearInterval(_pollDataInterval);
  return undefined;
};
