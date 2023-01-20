
const { ethers } = require("hardhat");
const path = require("path");
const fs = require("fs");


// Arguments required to deploy the TTPSC token contract
const tokenArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: 1000}

/*
Function that deploys TTPSC token contract
RETURN: TTPSC token
*/
const deployToken = async () => {

    const Token = await ethers.getContractFactory("TTPSC");
    const ttpscToken = await Token.deploy(
        tokenArgs.TOKEN_NAME,
        tokenArgs.TOKEN_SYMBOL,
        tokenArgs.INITIAL_SUPPLY
    );

    await ttpscToken.deployed();
    console.log("TTPSC token deployed at address: ", ttpscToken.address);

    return ttpscToken;
}


/*
Function that deploys payment manager contract and transfers funds to its address
PARAM: TTPSC token contract
RETURN: payment manager contract
*/
const deployPaymentsManager = async token => {
    
    const PaymentsManager = await ethers.getContractFactory("PaymentsManager");
    const paymentsManager = await PaymentsManager.deploy(token.address);

    await paymentsManager.deployed();
    console.log("Payments manager contract deployed at address: ", paymentsManager.address);

    await token.transfer(paymentsManager.address, tokenArgs.INITIAL_SUPPLY);

    return paymentsManager;
}

/*
Function that deploys rewards manager contract
PARAM: payments manager
RETURN: rewards manager contract
*/
const deployRewardsManager = async paymentsManager => {

    const RewardsManager = await ethers.getContractFactory("RewardsManager");
    const rewardsManager = await RewardsManager.deploy(paymentsManager.address);

    await rewardsManager.deployed();
    console.log("Rewards manager contract deployed at address: ", rewardsManager.address);

    return rewardsManager;
}

/*
Function that moves built json files from artifacts directory to frontend
PARAM: TTPSC toke, payments manager, rewards manager
*/
const saveFrontendFiles = async (token, paymentsManager, rewardsManager) => {

    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify(
            {Token: token.address, PaymentsManager: paymentsManager.address, RewardsManager: rewardsManager.address}, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("TTPSC");
    const PaymentsManagerArtifact = artifacts.readArtifactSync("PaymentsManager");
    const RewardsManagerArtifact = artifacts.readArtifactSync("RewardsManager");

    fs.writeFileSync(
        path.join(contractsDir, "Token.json"),
        JSON.stringify(TokenArtifact, null, 2)
    );

    fs.writeFileSync(
        path.join(contractsDir, "PaymentsManager.json"),
        JSON.stringify(PaymentsManagerArtifact, null, 2)
    );

    fs.writeFileSync(
        path.join(contractsDir, "RewardsManager.json"),
        JSON.stringify(RewardsManagerArtifact, null, 2)
    );
}


const main = async () =>  {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }

    const token = await deployToken();
    const paymentsManager = await deployPaymentsManager(token);
    const rewardsManager = await deployRewardsManager(paymentsManager);

    console.log("All contracts deployed succesfully");

    await saveFrontendFiles(token, paymentsManager, rewardsManager);

    console.log("All frontend files successfully saved");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });