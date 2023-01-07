// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");
const fs = require("fs");


async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }


    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("TTPSC");

    //todo move it .env
    const contractArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: 1000}

    const token = await Token.deploy(
        contractArgs.TOKEN_NAME,
        contractArgs.TOKEN_SYMBOL,
        contractArgs.INITIAL_SUPPLY
    );
    await token.deployed();

    console.log("Token address:", token.address);

    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify({Token: token.address}, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Token");

    fs.writeFileSync(
        path.join(contractsDir, "Token.json"),
        JSON.stringify(TokenArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
