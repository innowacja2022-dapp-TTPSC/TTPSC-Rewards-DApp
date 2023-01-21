# About

"Scripts" directory contains the script files that deal with the smart contract (*.sol) source files.

- pass data to smart contract constructor
- build smart contract source code (*.sol) to artifacts
- deploy contracts on blockchain
- move artifacts to another catalogs (for example to frontend)

The scripts are run by hardhat in the console as follows.

```shell
npx hardhat run scripts/deploy.js
```

Hardhat node is default network where contracts are deployed. Contracts are not saved anywehre. To change blockchain network
use ```--network <network-name>```

For example:

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

Or run local hardhat node in different terminal, and then they deploy to the localhost. 
```shell
npx hardhat node
npx hardhat run scripts/deploy.js --netowrk localhost
```
remote network must be added to hardhat.config.js file. exmaple:

```
module.exports = {
  solidity: '0.8.4',
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```
