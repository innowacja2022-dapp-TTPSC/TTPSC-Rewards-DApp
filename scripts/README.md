# About 
"Scripts" directory contains the script files that deal with the smart contract (*.sol) source files.
- pass data to smart contract constructor
- build smart contract source code (*.sol) to artifacts
- deploy contracts on blockchain
- move artifacts to another catalogs (for example to frontend)


The scripts are run by hardhat in the console as follows. 

```
npx hardhat run scripts/deploy.js
```
Hardhat node is default network where contracts are deployed. To change blockchain network use ```--network <network-name>```

For example: 
```
npx hardhat run scripts/deploy.js --network mumbai
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
