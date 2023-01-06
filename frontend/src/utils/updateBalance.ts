import { ethers } from "ethers";

export async function _updateBalance(
  _token: ethers.Contract,
  selectedAddress: string
) {
  const balance = await _token.balanceOf(selectedAddress);
  return { balance };
}
