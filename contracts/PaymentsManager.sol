// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Token.sol";

contract PaymentsManager {
    Token public token;

    address[] public employees;

    mapping(address => bool) public isEmployer;
    mapping(address => bool) public isCurrentEmployee;

    mapping(uint256 => PaymentRequest) public paymentRequests;
    uint256 public paymentRequestCount;

    enum PaymentRequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }

    struct PaymentRequest {
        address employee;
        uint256 amount;
        string requestReason;
        address decisionMaker;
        string decisionReason;
        PaymentRequestStatus status;
    }

    constructor(Token _token) {
        token = _token;
        addUser(token.owner(), true);
    }

    function hireEmployer(address employer) public {
        require(isEmployer[msg.sender], "Only the employer can add employees.");

        addUser(employer, true);
    }

    function hireEmployee(address employee) public {
        require(isEmployer[msg.sender], "Only the employer can add employees.");

        addUser(employee, false);
    }

    function addUser(address user, bool _isEmployer) private {
        employees.push(user);
        isEmployer[user] = _isEmployer;
        isCurrentEmployee[user] = true;
    }

    function fireEmployee(address employee) public {
        require(
            isEmployer[msg.sender],
            "Only the employer can terminate employees."
        );

        isCurrentEmployee[employee] = false;
    }

    function fireEmployeeAndReclaimTokens(address employee) public {
        fireEmployee(employee);
        reclaimTokens(employee);
    }

    function reclaimTokens(address employee) public {
        require(
            isEmployer[msg.sender],
            "Only the employer can reclaim tokens."
        );

        require(
            !isCurrentEmployee[employee],
            "This employee is still a current employee."
        );

        uint256 employeeBalance = token.balanceOf(employee);

        token.transfer(msg.sender, employeeBalance);
        token.transfer(employee, 0);
    }

    function createPaymentRequest(
        uint256 amount,
        string memory paymentRequestReason
    ) public {
        require(
            !isEmployer[msg.sender],
            "Only employees can create paymentRequests."
        );

        uint256 paymentRequestID = paymentRequestCount;
        paymentRequests[paymentRequestID] = PaymentRequest(
            msg.sender,
            amount,
            paymentRequestReason,
            address(0),
            "",
            PaymentRequestStatus.PENDING
        );

        paymentRequestCount++;
    }

    function resolvePaymentRequest(
        uint256 paymentRequestID,
        bool accept,
        string memory decisionReason
    ) public {
        require(
            isEmployer[msg.sender],
            "Only employers can decide on paymentRequests ."
        );

        PaymentRequest storage paymentRequest = paymentRequests[
        paymentRequestID
        ];
        require(
            paymentRequest.status == PaymentRequestStatus.PENDING,
            "This paymentRequest has already been decided on."
        );

        paymentRequest.decisionMaker = msg.sender;
        paymentRequest.decisionReason = decisionReason;
        paymentRequest.status = accept
        ? PaymentRequestStatus.ACCEPTED
        : PaymentRequestStatus.REJECTED;

        if (accept) {
            token.transfer(paymentRequest.employee, 1000);
        }
    }

    function getPaymentRequestStatus(
        uint256 paymentRequestID
    ) public view returns (PaymentRequestStatus) {
        return paymentRequests[paymentRequestID].status;
    }

    function getPaymentRequestDescription(
        uint256 paymentRequestID
    ) public view returns (string memory) {
        return paymentRequests[paymentRequestID].requestReason;
    }

    function getPaymentRequestAmount(
        uint256 paymentRequestID
    ) public view returns (uint256) {
        return paymentRequests[paymentRequestID].amount;
    }

    function getPaymentRequestHistory() public view returns (uint256[] memory) {
        uint256[] memory history = new uint256[](paymentRequestCount);
        for (uint256 i = 0; i < paymentRequestCount; i++) {
            history[i] = i;
        }
        return history;
    }
}
