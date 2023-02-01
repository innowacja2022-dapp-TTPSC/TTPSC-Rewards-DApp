const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payments manager contract", () => {

    let paymentsManager;
    let ttpscToken;
    let employeeAddress;
    let employee2Address;
    let manager;

    const contractArgs = {
        TOKEN_NAME: "TTPSC token",
        TOKEN_SYMBOL: "TTPSC",
        INITIAL_SUPPLY: ethers.utils.parseUnits("10", "ether")
    };

    before(async () => {
        const token = await ethers.getContractFactory("TTPSC");

        ttpscToken = await token.deploy(
            contractArgs.TOKEN_NAME,
            contractArgs.TOKEN_SYMBOL,
            contractArgs.INITIAL_SUPPLY
        );

        manager = await ethers.getContractFactory("PaymentsManager");
        // ADDR1 IS FOR TESTING FUNCTIONS THAT REQUIRE EMPLOYEE STATUS
        const [owner, addr1, addr2] = await ethers.getSigners();
        employeeAddress = addr1;
        employee2Address = addr2;
        paymentsManager = await manager.deploy(ttpscToken.address);

        await ttpscToken.transfer(paymentsManager.address, contractArgs.INITIAL_SUPPLY);
        await paymentsManager.hireEmployee(employeeAddress.address);
        await paymentsManager.hireEmployee(employee2Address.address);
    });

    describe("Deployment", () => {
        it("Should set the right token address", async () => {
            const tokenAddressInManager = await paymentsManager.token();
            expect(tokenAddressInManager).to.equal(ttpscToken.address);
        });

        it("Should mark the token owner as employer", async () => {
            const isTokenOwnerEmployer = await paymentsManager.isEmployer(ttpscToken.owner());
            expect(isTokenOwnerEmployer).to.equal(true);
        });
    });

    describe("Employee and employers handling", () => {
        it("Should hire new employer", async () => {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await paymentsManager.hireEmployer(randomWalletAddress);
            const isEmployer = await paymentsManager.isEmployer(randomWalletAddress);
            expect(isEmployer).to.equal(true);
        });

        it("Should hire new employee", async () => {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await paymentsManager.hireEmployee(randomWalletAddress);
            const isEmployer = await paymentsManager.isEmployer(randomWalletAddress);
            expect(isEmployer).to.equal(false);
        });

        it("Should fire employee", async () => {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await paymentsManager.hireEmployee(randomWalletAddress);

            let isCurrentEmployee = await paymentsManager.isCurrentEmployee(randomWalletAddress);
            expect(isCurrentEmployee).to.equal(true);

            await paymentsManager.fireEmployee(randomWalletAddress);

            isCurrentEmployee = await paymentsManager.isCurrentEmployee(randomWalletAddress);
            expect(isCurrentEmployee).to.equal(false);
        });

        it("Should throw appriopriate error if handling employees as an employee", async () => {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await expect(paymentsManager.connect(employeeAddress).hireEmployer(randomWalletAddress))
                .to.be.revertedWith("Only the employer can add employees.");
            await expect(paymentsManager.connect(employeeAddress).hireEmployee(randomWalletAddress))
                .to.be.revertedWith("Only the employer can add employees.");
            await expect(paymentsManager.connect(employeeAddress).fireEmployee(randomWalletAddress))
                .to.be.revertedWith("Only the employer can terminate employees.");
        });
    });

    describe("Payment requests", () => {

        beforeEach(async () => {
            const token = await ethers.getContractFactory("TTPSC");

            ttpscToken = await token.deploy(
                contractArgs.TOKEN_NAME,
                contractArgs.TOKEN_SYMBOL,
                contractArgs.INITIAL_SUPPLY
            );
            paymentsManager = await manager.deploy(ttpscToken.address);
            await ttpscToken.transfer(paymentsManager.address, contractArgs.INITIAL_SUPPLY);
            await paymentsManager.hireEmployee(employeeAddress.address);
            await paymentsManager.hireEmployee(employee2Address.address);
        });

        it("Should create a payment request with correct parameters", async () => {
            const reason = "For completing task";
            const amount = 1;
            const expectedStatus = 0;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, amount, reason);

            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));
            const requestAmount = await paymentsManager.getPaymentRequestAmount(requestId);
            const requestReason = await paymentsManager.getPaymentRequestDescription(requestId);

            expect(requestAmount).to.equal(amount);
            expect(requestReason).to.equal(reason);
            expect(requestStatus).to.equal(expectedStatus);
        });

        it("Should accept a payment request and transfer token to employee's account", async () => {
            const reason = "For completing task";
            const amount = 10;
            const expectedStatus = 1;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, amount, reason);

            await paymentsManager.acceptPaymentRequest(requestId, "Task is well done");
            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));

            expect(requestStatus).to.equal(expectedStatus);
            expect(await ttpscToken.balanceOf(employee2Address.address)).to.equal(amount);
        });

        it("Should reject a payment request", async () => {
            const reason = "For completing task";
            const amount = 1;
            const expectedStatus = 2;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, amount, reason);

            await paymentsManager.rejectPaymentRequest(requestId, "Task is not well done");
            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));

            expect(requestStatus).to.equal(expectedStatus);
        });

        it("Should throw error if creating payment request as an employer", async () => {
            await expect(paymentsManager.createPaymentRequest(employeeAddress.address, 1, "For completing task"))
                .to.be.revertedWith("Only employees can create paymentRequests.");
        });

        it("Should throw error if payment request recipient is not an employee", async () => {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await expect(paymentsManager.connect(employeeAddress).createPaymentRequest(randomWalletAddress, 1, "To be or not to be"))
                .to.be.revertedWith("The employee you recommend must be current employee");
        });

        it("Should throw error if payment request recipient is same as msg.address", async () => {
            await expect(paymentsManager.connect(employeeAddress).createPaymentRequest(employeeAddress.address, 1, "To be or not to be"))
                .to.be.revertedWith("You cannot give yourself a bonus");
        });

        it("Should throw error if accepting or rejecting payment request as an employee", async () => {
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, 1, "For completing task");
            await expect(paymentsManager.connect(employeeAddress).acceptPaymentRequest(requestId, "Ok"))
                .to.be.revertedWith("Only employers can decide on paymentRequests .");
            await expect(paymentsManager.connect(employeeAddress).rejectPaymentRequest(requestId, "No"))
                .to.be.revertedWith("Only employers can decide on paymentRequests .");
        });

        it("Should throw error if trying to change already established payment request status", async () => {
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, 1, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Task is well done");
            await expect(paymentsManager.rejectPaymentRequest(requestId, "Task is not well done"))
                .to.be.revertedWith("This paymentRequest has already been decided on.");
        });

        it("should return an array of all payment requests", async () => {
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, 100, "test reason");
            await paymentsManager.connect(employeeAddress).createPaymentRequest(employee2Address.address, 200, "test reason 2");

            const paymentRequests = await paymentsManager.getPaymentRequestHistory();

            expect(paymentRequests).to.have.lengthOf(2);
            expect(paymentRequests[0].amount.toNumber()).to.equal(100);
            expect(paymentRequests[1].amount.toNumber()).to.equal(200);
        });

        it('should return an empty array if no payment requests have been made', async () => {
            const actual = await paymentsManager.getPaymentRequestHistory();
            const expected = [];

            expect(actual).to.have.lengthOf(0);
            expect(actual).to.deep.equal(expected);
        });

    });
});
