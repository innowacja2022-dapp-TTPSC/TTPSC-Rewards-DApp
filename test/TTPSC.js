const {expect} = require("chai");

const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const {ethers} = require("hardhat");


describe("Token contract", function () {

    async function deployTTPSCTokenFixture() {
        const Token = await ethers.getContractFactory("TTPSC");
        const [owner, address1, address2] = await ethers.getSigners();

        const contractArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: 1000}
        const hardhatToken = await Token.deploy(
            contractArgs.TOKEN_NAME,
            contractArgs.TOKEN_SYMBOL,
            contractArgs.INITIAL_SUPPLY
        );

        await hardhatToken.deployed();

        // Fixtures can return anything you consider useful for your tests
        return {Token, hardhatToken, owner, address1, address2};
    }

    describe("Deployment", function () {

        it("Should set the right owner", async function () {

            const {hardhatToken, owner} = await loadFixture(deployTTPSCTokenFixture);
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {

            const {hardhatToken, owner} = await loadFixture(deployTTPSCTokenFixture);
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });
});
