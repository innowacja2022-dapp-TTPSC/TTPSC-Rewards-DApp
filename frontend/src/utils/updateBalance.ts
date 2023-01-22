import { BigNumber, ethers } from "ethers";

export const _updateBalance = async (
  _token: ethers.Contract,
  selectedAddress: string
): Promise<BigNumber> => {
  const balance = await _token.balanceOf(selectedAddress);
  return Promise.resolve(balance);
};
