
const {expect} = require("chai");
const {ethers} = require("hardhat");

const tokenArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: ethers.utils.parseUnits("100", "ether")};

describe("Rewards manager contract", async () => {

    let token;
    let paymentsManager;
    let rewardsManager;
    let employeeAddress;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("TTPSC");
        token = await Token.deploy(
            tokenArgs.TOKEN_NAME,
            tokenArgs.TOKEN_SYMBOL,
            tokenArgs.INITIAL_SUPPLY
        );
        const PaymentsManager = await ethers.getContractFactory("PaymentsManager");
        const [owner, addr1] = await ethers.getSigners();
        paymentsManager = await PaymentsManager.deploy(token.address);
        await token.transfer(paymentsManager.address, tokenArgs.INITIAL_SUPPLY);
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

    describe("Rewards", () => {

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

        it("Should return empty array if no reward was added", async () => {
            const rewards = await rewardsManager.getAllRewards();
            expect(rewards).to.have.lengthOf(0);
        });

        it("Should return reward with correct parameters", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            expect(rewards).to.have.lengthOf(1);
            expect(rewards[0].name).to.equal(name);
            expect(rewards[0].imgHash).to.equal(imgHash);
            expect(rewards[0].price).to.equal(price);
            expect(rewards[0].inStock).to.equal(inStock);
            expect(rewards[0].id).to.equal(0);
        });

        it("Should return correct reward count", async () => {
            const rewardsCount = 30;
            for(let i = 0;i<rewardsCount;i++) {
                await rewardsManager.addReward(name + i, imgHash, price, inStock);
            }
            const rewards = await rewardsManager.getAllRewards();
            expect(rewards).to.have.lengthOf(rewardsCount);
        });

        it("Should return error when adding reward with the same name", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            await expect(rewardsManager.addReward(name, imgHash, price, inStock))
                .to.be.revertedWith("A reward with the same name already exists");
        });

        it("Should throw error when changing reward stock as employee", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            expect(rewardsManager.connect(employeeAddress).changeInStock(rewards[0].id, 10))
                .to.be.revertedWith("Only employer can change stock count.");
        });

        it("Should emit in stock changed event", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            expect(rewardsManager.changeInStock(rewards[0].id, 10))
                .to.emit(rewardsManager, "InStockChanged").withArgs(rewards[0].id, 10);
        });

        it("Should return correct in stock count for added reward", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            const setInStock = await rewardsManager.getInStock(rewards[0].id);
            expect(setInStock).to.equal(inStock);
        });
        
    });

    describe("Placing orders", () => {
        // TO BE CONTINUED
    });
    
});