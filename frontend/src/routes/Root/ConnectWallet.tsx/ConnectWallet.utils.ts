import { _getBalance, _startPollingData, _stopPollingData } from "@utils/pollingData";
import { ethers } from "ethers";
import TokenArtifact from "@contracts/Token.json";
import contractAddress from "@contracts/contract-address.json";
import { Wallet } from "@components/Dapp";

const HARDHAT_NETWORK_ID = "1337";

export async function _initializeEthers() {
  // We first initialize ethers by creating a provider using window.ethereum
  const _provider = new ethers.providers.Web3Provider(window.ethereum);

  // Then, we initialize the contract using that provider and the token's
  // artifact. You can do this same thing with your contracts.
  const _token = new ethers.Contract(
    contractAddress.Token,
    TokenArtifact.abi,
    _provider.getSigner(0)
  );
  return _token;
}

export async function _getTokenData(_token: ethers.Contract) {
  const name = await _token.name();
  const symbol = await _token.symbol();

  return { tokenData: { name, symbol } };
}

export async function _initialize(userAddress: string) {
  // This method initializes the dapp

  // We first store the user's address in the component's state

  // Then, we initialize ethers, fetch the token's data, and start polling
  // for the user's balance.

  // Fetching the token data and the user's balance are specific to this
  // sample project, but you can reuse the same initialization pattern.
  const _token = await _initializeEthers();
  const tokenData = await _getTokenData(_token);
  const _pollDataInterval = _startPollingData(_token, userAddress);
  return {
    _token,
    tokenData,
    _pollDataInterval,
  };

}

export async function _connectWallet(
  handleWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>
) {
  // This method is run when the user clicks the Connect. It connects the
  // dapp to the user's wallet, and initializes it.

  // To connect to the user's wallet, we have to run this method.
  // It returns a promise that will resolve to the user's address.
  const [selectedAddress] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // Once we have the address, we can initialize the application.

  // First we check the network
  if (!_checkNetwork()) {
    return;
  }

  const { _token, tokenData, _pollDataInterval } = await _initialize(
    selectedAddress
  );

  const balance = await _getBalance(_token, selectedAddress);

  handleWallet({
    _token,
    tokenData: {
      name: tokenData.tokenData.name,
      symbol: tokenData.tokenData.symbol,
    },
    _pollDataInterval,
    selectedAddress,
    balance,
  });
  // We reinitialize it whenever the user changes their account.
  window.ethereum.on("accountsChanged", (newAddress: string) => {
    _stopPollingData(_pollDataInterval);
    // `accountsChanged` event can be triggered with an undefined newAddress.
    // This happens when the user removes the Dapp from the "Connected
    // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
    // To avoid errors, we reset the dapp state
    if (newAddress === undefined) {
      throw new Error("no address");
    }

    _initialize(newAddress);
  });

  // We reset the dapp state if the network is changed
  window.ethereum.on("chainChanged", (chainId: string) => {
    _stopPollingData(_pollDataInterval);
    window.location.reload();
  });
}

export async function _checkNetwork() {
  if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
    return true;
  }

  return false;
}
