require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const {NETWORK_NAME, NETWORK_RPC_URL, PRIVATE_KEY} = process.env;

function initBlockChainNetworks() {
    const networks = {}

    networks["hardhat"] = {
        chainId: 1337
    }

    networks[NETWORK_NAME] = {
        url: NETWORK_RPC_URL,
        accounts: [PRIVATE_KEY]
    }

    return networks;
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: NETWORK_NAME,
    networks: initBlockChainNetworks()

};
