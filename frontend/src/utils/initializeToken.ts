import contractAddress from "@contracts/contract-address.json";
import TokenArtifact from "@contracts/Token.json";
import { Token, Wallet } from "@services/WalletService";
import { ethers } from "ethers";
import { _startPollingData } from "./pollingData";

export const _getTokenData = async (
  _token: ethers.Contract
): Promise<Token> => {
  const name = await _token.name()[0];
  const symbol = await _token.symbol()[0];

  return { name, symbol };
};

export const _initializeToken = async (): Promise<Wallet | undefined> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  if (!provider) {
    return Promise.reject();
  }
  const [selectedAddress] = await provider.send("eth_requestAccounts", []);
  if (!selectedAddress) {
    return Promise.reject();
  }
  const _token = new ethers.Contract(
    contractAddress.Token,
    TokenArtifact.abi,
    provider.getSigner()
  );

  if (!_token) {
    return Promise.reject();
  }
  const tokenData = await _getTokenData(_token);
  if (!tokenData) {
    return Promise.reject();
  }
  const _pollDataInterval = _startPollingData(_token, selectedAddress);
  if (!_pollDataInterval) {
    return Promise.reject();
  }
  const balance = ethers.utils.formatEther(
    await _token.balanceOf(selectedAddress)
  );

  if (!balance) {
    return Promise.reject();
  }

  return {
    _token,
    tokenData,
    _pollDataInterval,
    balance,
    selectedAddress,
    isAdmin: true,
  };
};

// window.ethereum.on("chainChanged", (chainId: string) => {
//   _stopPollingData(_pollDataInterval);

//   window.location.reload();
// });

// window.ethereum.on("accountsChanged", (newAddress: string) => {
//   _stopPollingData(_pollDataInterval);

//   console.log("aa");
// `accountsChanged` event can be triggered with an undefined newAddress.
// This happens when the user removes the Dapp from the "Connected
// list of sites allowed access to your addresses" (Metamask > Settings > Connections)
// To avoid errors, we reset the dapp state
//   if (newAddress === undefined) {
//     console.log("xxx");
//     localStorage.removeItem("authorization");
//     return;
//   }
//   _initialize();
// });
