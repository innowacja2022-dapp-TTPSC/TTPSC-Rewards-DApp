
const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("Rewards manager contract", async () => {

    let token;
    let paymentsManager;
    let rewardsManager;
    let employeeAddress;

    before(async () => {

        const contractArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: ethers.utils.parseUnits("100", "ether")};
        const Token = await ethers.getContractFactory("TTPSC");

        token = await Token.deploy(
            contractArgs.TOKEN_NAME,
            contractArgs.TOKEN_SYMBOL,
            contractArgs.INITIAL_SUPPLY
        );

        const PaymentsManager = await ethers.getContractFactory("PaymentsManager");

        // ADDR1 IS FOR TESTING FUNCTIONS THAT REQUIRE EMPLOYEE STATUS
        const [owner, addr1] = await ethers.getSigners();
        
        paymentsManager = await PaymentsManager.deploy(token.address);

        await token.transfer(paymentsManager.address, contractArgs.INITIAL_SUPPLY);
        employeeAddress = addr1;

        await paymentsManager.hireEmployee(employeeAddress.address);

        const RewardsManager = await ethers.getContractFactory("RewardsManager");

        rewardsManager = await RewardsManager.deploy(paymentsManager.address);
    });

    describe("Deployment", () => {
        it("Should set the right payments manager", async () => {
            const paymentsManagerAddressInRewardsManager = await rewardsManager.paymentsManager();
            expect(paymentsManagerAddressInRewardsManager).to.equal(paymentsManager.address);
        });

        it("Should set the right token", async () => {
            const tokenAddressInRewardsManager = await rewardsManager.token();
            expect(tokenAddressInRewardsManager).to.equal(token.address);
        });
    });

    describe("Adding rewards", () => {

        const name = "giftcard";
        const imgHash = "#";
        const price = 100;
        const inStock = 5;

        it("Should emit a new reward", async () => {
            await expect(rewardsManager.addReward(name, imgHash, price, inStock))
                .to.emit(rewardsManager, "NewReward").withArgs(name, price, inStock);
        });

        it("Should throw error when adding reward as an employee", async () => {
            await expect(rewardsManager.connect(employeeAddress).addReward(name, imgHash, price, inStock))
                .to.be.revertedWith("Only employer can add new reward.");
        });

        it("Should return added reward with correct parameters", async () => {
            const rewards = await rewardsManager.getAllRewards();
            expect(rewards).to.have.lengthOf(1);
            expect(rewards[0].name).to.equal(name);
            expect(rewards[0].imgHash).to.equal(imgHash);
            expect(rewards[0].price).to.equal(price);
            expect(rewards[0].inStock).to.equal(inStock);
        });

        it("Should throw error when adding reward with the same name", async () => {
            await expect(rewardsManager.addReward(name, imgHash, price, inStock))
                .to.be.revertedWith("A reward with the same name already exists");
        });
        
    });
    
});