const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokenArgs = {
    TOKEN_NAME: "TTPSC token",
    TOKEN_SYMBOL: "TTPSC",
    INITIAL_SUPPLY: ethers.utils.parseUnits("100", "ether")
};

describe("Rewards manager contract", async () => {

    let token;
    let paymentsManager;
    let rewardsManager;
    let employeeAddress;
    let employee2Address;

    // REWARD DATA
    const name = "giftcard";
    const imgHash = "#";
    const price = 100;
    const inStock = 5;

    beforeEach(async () => {
        const Token = await ethers.getContractFactory("TTPSC");
        token = await Token.deploy(
            tokenArgs.TOKEN_NAME,
            tokenArgs.TOKEN_SYMBOL,
            tokenArgs.INITIAL_SUPPLY
        );
        const PaymentsManager = await ethers.getContractFactory("PaymentsManager");
        const [owner, addr1, addr2] = await ethers.getSigners();
        paymentsManager = await PaymentsManager.deploy(token.address);
        await token.transfer(paymentsManager.address, tokenArgs.INITIAL_SUPPLY);
        employeeAddress = addr1;
        employee2Address = addr2;
        await paymentsManager.hireEmployee(employeeAddress.address);
        await paymentsManager.hireEmployee(employee2Address.address);
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
            for (let i = 0; i < rewardsCount; i++) {
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

        it("Should change price of a reward", async function() {
            await rewardsManager.addReward(name, imgHash, price, inStock);

            const newPrice = 15;
            const rewardId = 0;


            await rewardsManager.changePrice(rewardId, newPrice);

            const reward = await rewardsManager.rewards(rewardId);
            expect(reward.price).to.equal(newPrice);

        });

        it("Does not allow non-employer to change price of a reward", async function() {
            await rewardsManager.addReward("Reward 1", "imgHash1", 100, 10);

            await expect(
                rewardsManager.connect(employeeAddress).changePrice(0, 200)
            ).to.be.revertedWith("Only employer can change stock count.");

            const rewards = await rewardsManager.getAllRewards();
            expect(rewards[0].price).to.equal(100);


        });


        it("Should return correct in stock count for added reward", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            const setInStock = await rewardsManager.getInStock(rewards[0].id);
            expect(setInStock).to.equal(inStock);
        });

    });

    describe("Order placing", () => {

        it("Should throw error when placing order while being unemployed", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            await paymentsManager.fireEmployee(employeeAddress.address);
            const rewards = await rewardsManager.getAllRewards();
            await expect(rewardsManager.connect(employeeAddress).placeOrder(rewards[0].id, 1))
                .to.be.revertedWith("Only current employee can exchange tokens.");
        });

        it("Should throw error when trying to order reward with wrong id", async () => {
            await expect(rewardsManager.placeOrder(100, 1))
                .to.be.revertedWith("Reward with given ID does not exists");
        });

        it("Should throw error when employee hasn't approved tokens", async () => {
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            await expect(rewardsManager.connect(employeeAddress).placeOrder(rewards[0].id, 1))
                .to.be.revertedWith("You must approve this contract address to spend your tokens.");
        });

        it("Should throw error when employee has insufficient tokens for order", async () => {
            const wantedQuantity = 1;
            const tokenRequestAmount = 10;
            const tokenApprovedAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employeeAddress).approve(rewardsManager.address, tokenApprovedAmount);

            await expect(rewardsManager.connect(employeeAddress).placeOrder(rewards[0].id, wantedQuantity))
                .to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });

        it("Should throw error when insufficient reward in stock", async () => {
            const wantedQuantity = 6;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);
            await expect(rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, wantedQuantity))
                .to.be.revertedWith("Not enough quantity in stock");
        });

        it("Should emit OrderPlaced and decrease reward in stock amount", async () => {
            const wantedQuantity = 1;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            let rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            await expect(rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, wantedQuantity))
                .to.emit(rewardsManager, "OrderPlaced").withArgs(employee2Address.address, rewards[0].id, wantedQuantity);

            rewards = await rewardsManager.getAllRewards();
            const newRewardQuantity = rewards[0].inStock;
            expect(newRewardQuantity).to.equal(inStock - wantedQuantity);
        });

    });

    describe("Order collecting", () => {

        it("Should mark order as collected", async () => {
            const wantedQuantity = 1;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            await rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, wantedQuantity);

            await expect(rewardsManager.markCollected(employee2Address.address, rewards[0].id, wantedQuantity))
                .to.emit(rewardsManager, "OrderCollected").withArgs(employee2Address.address, rewards[0].id, wantedQuantity);

        });

        it("Should throw error when marking order as collected as employee", async () => {
            const wantedQuantity = 1;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            await expect(rewardsManager.connect(employeeAddress).markCollected(employee2Address.address, rewards[0].id, wantedQuantity))
                .to.be.revertedWith("Only employer can mark orders as collected.");
        });

        it("Should throw error when trying to collect order that hasn't been placed", async () => {
            const wantedQuantity = 1;
            const invalidId = 10;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            await rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, wantedQuantity);

            await expect(rewardsManager.markCollected(employee2Address.address, invalidId, wantedQuantity))
                .to.be.revertedWith("This order has not been placed or has already been collected.");
        });

        it("Should throw error when trying to collect order that has been collected before", async () => {
            const wantedQuantity = 1;
            const tokenRequestAmount = 2000;

            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();
            const rewardId = rewards[0].id;

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");

            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            await rewardsManager.connect(employee2Address).placeOrder(rewardId, wantedQuantity);

            await rewardsManager.markCollected(employee2Address.address, rewardId, wantedQuantity);

            await expect(rewardsManager.markCollected(employee2Address.address, rewardId, wantedQuantity))
                .to.be.revertedWith("This order has not been placed or has already been collected.");
        });

        it("Should return correct amount of pending orders per user", async () => {
            const tokenRequestAmount = 2000;
            const ordersAmount = 8;
            const inStock = 10;
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");
            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            for (let i = 0; i < ordersAmount; i++) {
                await rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, 1);
            }

            const pendingOrders = await rewardsManager.getAllPendingOrdersByAddress(employee2Address.address);
            const pendingOrdersCount = await rewardsManager.getPendingOrdersCount(employee2Address.address, rewards[0].id);

            expect(pendingOrders[1][0]).to.equal(pendingOrdersCount);
        });

        it("Should return list of or pending orders", async () => {
            const tokenRequestAmount = 2000;
            const inStock = 10;
            await rewardsManager.addReward(name, imgHash, price, inStock);
            const rewards = await rewardsManager.getAllRewards();

            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, tokenRequestAmount, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Well done");
            await token.connect(employee2Address).approve(rewardsManager.address, tokenRequestAmount);

            for (let i = 0; i < 3; i++) {
                await rewardsManager.connect(employee2Address).placeOrder(rewards[0].id, 1);
            }

            const pendingOrders = await rewardsManager.getAllPendingOrders();
            const pendingOrdersCount = await rewardsManager.getPendingOrdersCount(employee2Address.address, rewards[0].id);

            const sums = pendingOrders.reduce((acc, item) => {
                item.slice(1).forEach((value, index) => {
                    if (acc[index]) {
                        acc[index] = acc[index].add(BigInt(value[0][1].hex));
                    } else {
                        acc[index] = BigInt(value[0][1]._hex);
                    }
                });
                return acc;
            }, []);
            const totalSum = sums.reduce((acc, sum) => acc + Number(sum), 0);
            expect(totalSum).to.equal(pendingOrdersCount);
        });
    });

});