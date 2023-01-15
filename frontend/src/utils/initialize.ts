import contractAddress from "@contracts/contract-address.json";
import TokenArtifact from "@contracts/Token.json";
import { Token } from "@services/TokenService";
import { Wallet } from "@services/WalletService";
import { ethers } from "ethers";
import { _startPollingData } from "./pollingData";

export const _getTokenData = async (
  _token: ethers.Contract
): Promise<Token> => {
  const name = await _token.name();
  const symbol = await _token.symbol();

  return { name, symbol };
};

export const _initialize = async (): Promise<Wallet | undefined> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [selectedAddress] = await provider.send("eth_requestAccounts", []);
  const _token = new ethers.Contract(
    contractAddress.Token,
    TokenArtifact.abi,
    provider.getSigner(0)
  );
  const tokenData = await _getTokenData(_token);
  const _pollDataInterval = _startPollingData(_token, selectedAddress);
  const balance = ethers.utils.formatEther(
    await provider.getBalance(selectedAddress)
  );

  return {
    _token,
    tokenData,
    _pollDataInterval,
    balance,
    selectedAddress,
  };
};
