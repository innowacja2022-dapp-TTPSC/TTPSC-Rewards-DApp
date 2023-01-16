const {expect} = require("chai");
const {ethers} = require("hardhat");


describe("Payments manager contract", function () {

    let paymentsManager;
    let ttpscToken;
    let employeeAddress;

    before(async function() {
        const token = await ethers.getContractFactory("TTPSC");
        const contractArgs = {TOKEN_NAME: "TTPSC token", TOKEN_SYMBOL: "TTPSC", INITIAL_SUPPLY: ethers.utils.parseUnits("10", "ether")}
        ttpscToken = await token.deploy(
            contractArgs.TOKEN_NAME,
            contractArgs.TOKEN_SYMBOL,
            contractArgs.INITIAL_SUPPLY
        );
        const manager = await ethers.getContractFactory("PaymentsManager");
        // ADDR1 IS FOR TESTING FUNCTIONS THAT REQUIRE EMPLOYEE STATUS
        const [owner, addr1] = await ethers.getSigners();
        paymentsManager = await manager.deploy(ttpscToken.address);
        await ttpscToken.transfer(paymentsManager.address, contractArgs.INITIAL_SUPPLY);
        employeeAddress = addr1;
        await paymentsManager.hireEmployee(employeeAddress.address);
    });

    describe("Deployment", function () {
        it("Should set the right token address", async function() {
            const tokenAddressInManager = await paymentsManager.token();
            expect(tokenAddressInManager).to.equal(ttpscToken.address);
        });

        it("Should mark the token owner as employer", async function() {
            const isTokenOwnerEmployer = await paymentsManager.isEmployer(ttpscToken.owner());
            expect(isTokenOwnerEmployer).to.equal(true);
        });
    });

    describe("Employee and employers handling", function() {
        it("Should hire new employer", async function() {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await paymentsManager.hireEmployer(randomWalletAddress);
            const isEmployer = await paymentsManager.isEmployer(randomWalletAddress);
            expect(isEmployer).to.equal(true);
        });

        it("Should hire new employee", async function() {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await paymentsManager.hireEmployee(randomWalletAddress);
            const isEmployer = await paymentsManager.isEmployer(randomWalletAddress);
            expect(isEmployer).to.equal(false);
        });

        it("Should fire employee", async function() {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            const [x] = await ethers.getSigners();
            await paymentsManager.hireEmployee(randomWalletAddress);

            let isCurrentEmployee = await paymentsManager.isCurrentEmployee(randomWalletAddress);
            expect(isCurrentEmployee).to.equal(true);

            await paymentsManager.fireEmployee(randomWalletAddress);

            isCurrentEmployee = await paymentsManager.isCurrentEmployee(randomWalletAddress);
            expect(isCurrentEmployee).to.equal(false);
        });

        it("Should throw appriopriate error if handling employees as an employee", async function() {
            const randomWalletAddress = ethers.Wallet.createRandom().address;
            await expect(paymentsManager.connect(employeeAddress).hireEmployer(randomWalletAddress))
                .to.be.revertedWith("Only the employer can add employees.");
            await expect(paymentsManager.connect(employeeAddress).hireEmployee(randomWalletAddress))
                .to.be.revertedWith("Only the employer can add employees.");
            await expect(paymentsManager.connect(employeeAddress).fireEmployee(randomWalletAddress))
                .to.be.revertedWith("Only the employer can terminate employees.");
        });
    });

    describe("Token reclaiming", function() {
        // TODO
    });

    describe("Payment requests", function() {
        it("Should create a payment request with correct parameters", async function() {
            const reason = "For completing task";
            const amount = 1;
            const expectedStatus = 0;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(amount, reason);

            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));
            const requestAmount = await paymentsManager.getPaymentRequestAmount(requestId);
            const requestReason = await paymentsManager.getPaymentRequestDescription(requestId);

            expect(requestAmount).to.equal(amount);
            expect(requestReason).to.equal(reason);
            expect(requestStatus).to.equal(expectedStatus);
        });

        it("Should accept a payment request and transfer token to employee's account", async function() {
            const reason = "For completing task";
            const amount = 10;
            const expectedStatus = 1;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(amount, reason);
            
            await paymentsManager.acceptPaymentRequest(requestId, "Task is well done");
            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));

            expect(requestStatus).to.equal(expectedStatus);
            expect(await ttpscToken.balanceOf(employeeAddress.address)).to.equal(amount);
        });

        it("Should reject a payment request", async function() {
            const reason = "For completing task";
            const amount = 1;
            const expectedStatus = 2;
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(amount, reason);
            
            await paymentsManager.rejectPaymentRequest(requestId, "Task is not well done");
            const requestStatus = Number(await paymentsManager.getPaymentRequestStatus(requestId));

            expect(requestStatus).to.equal(expectedStatus);
        });

        it("Should throw error if creating payment request as an employer", async function() {
            await expect(paymentsManager.createPaymentRequest(1, "For completing task"))
                .to.be.revertedWith("Only employees can create paymentRequests.");
        });

        it("Should throw error if accepting or rejecting payment request as an employee", async function() {
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(1, "For completing task");
            await expect(paymentsManager.connect(employeeAddress).acceptPaymentRequest(requestId, "Ok"))
                .to.be.revertedWith("Only employers can decide on paymentRequests .");
            await expect(paymentsManager.connect(employeeAddress).rejectPaymentRequest(requestId, "No"))
                .to.be.revertedWith("Only employers can decide on paymentRequests .");
        });

        it("Should throw error if trying to change already established payment request status", async function() {
            const requestId = await paymentsManager.paymentRequestCount();
            await paymentsManager.connect(employeeAddress).createPaymentRequest(1, "For completing task");
            await paymentsManager.acceptPaymentRequest(requestId, "Task is well done");
            await expect(paymentsManager.rejectPaymentRequest(requestId, "Task is not well done"))
                .to.be.revertedWith("This paymentRequest has already been decided on.");
        });

        it("Should return all created payment requests ids", async function() {
            // IT WILL RETURN ALL REQUESTS CREATED WITHIN PREVIOUS TESTS (SO 5)
            const expectedRequestsAmount = 5;
            const requests = await paymentsManager.getPaymentRequestHistory();
            expect(requests.length).to.equal(expectedRequestsAmount);
        });
    });
});