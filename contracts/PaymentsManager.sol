// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./TTPSC.sol";
import "hardhat/console.sol";

contract PaymentsManager {
    // notice that PaymentsManager require token balance in TTPSC contract
    TTPSC public token;

    address[] public employees;
    uint256 public employeesCount;

    mapping(address => bool) public isEmployer;
    mapping(address => bool) public isCurrentEmployee;
    uint256 public currentEmployeeCount = 0;

    mapping(uint256 => PaymentRequest) public paymentRequests;
    uint256 public paymentRequestCount = 0;

    enum PaymentRequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }

    struct PaymentRequest {
        uint256 id;
        address employee;
        uint256 amount;
        string requestReason;
        address decisionMaker;
        string decisionReason;
        PaymentRequestStatus status;
    }

    constructor(TTPSC _token) {
        token = _token;
        addUser(token.owner(), true);
    }

    event PaymentRequestNew(
        uint256 paymentRequestID,
        uint256 indexed amount,
        address employee
    );
    event PaymentRequestAccepted(
        address employee
    );
    event PaymentRequestRejected(
        address employee
    );

    function hireEmployer(address employer) public {
        require(
            isEmployer[msg.sender],
            "Only the employer can add employers."
        );

        addUser(employer, true);
    }

    function hireEmployee(address employee) public {
        require(
            isEmployer[msg.sender],
            "Only the employer can add employees."
        );
        require(
            !isCurrentEmployee[employee],
            "User with this address is already hired"
        );

        addUser(employee, false);
        currentEmployeeCount++;
    }

    function addUser(address user, bool _isEmployer) private {
        employees.push(user);
        employeesCount++;
        isEmployer[user] = _isEmployer;
        isCurrentEmployee[user] = true;
    }

    function fireEmployee(address employee) public {
        require(
            isEmployer[msg.sender],
            "Only the employer can terminate employees."
        );

        isCurrentEmployee[employee] = false;
        currentEmployeeCount--;
    }

    function createPaymentRequest(
        address recipient,
        uint256 amount,
        string memory paymentRequestReason
    ) public {
        require(
            !isEmployer[msg.sender],
            "Only employees can create paymentRequests."
        );
        require(
            isCurrentEmployee[recipient],
            "The employee you recommend must be current employee"
        );
        require(
            recipient != msg.sender,
            "You cannot give yourself a bonus"
        );

        uint256 paymentRequestID = paymentRequestCount;
        paymentRequests[paymentRequestID] = PaymentRequest(
            paymentRequestID,
            recipient,
            amount,
            paymentRequestReason,
            address(0),
            "",
            PaymentRequestStatus.PENDING
        );

        emit PaymentRequestNew(paymentRequestID, amount, msg.sender);

        paymentRequestCount++;
    }

    function acceptPaymentRequest(
        uint256 paymentRequestID,
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
        paymentRequest.status = PaymentRequestStatus.ACCEPTED;

        // todo consider allowance and transferFrom Pattern
        token.transfer(paymentRequest.employee, paymentRequest.amount);
        emit PaymentRequestAccepted(paymentRequest.employee);
    }

    function rejectPaymentRequest(
        uint256 paymentRequestID,
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
        paymentRequest.status = PaymentRequestStatus.REJECTED;

        emit PaymentRequestRejected(paymentRequest.employee);
    }

    function getPaymentRequestStatus(uint256 paymentRequestID)
    public
    view
    returns (PaymentRequestStatus)
    {
        return paymentRequests[paymentRequestID].status;
    }

    function getPaymentRequestDescription(uint256 paymentRequestID)
    public
    view
    returns (string memory)
    {
        return paymentRequests[paymentRequestID].requestReason;
    }

    function getPaymentRequestAmount(uint256 paymentRequestID)
    public
    view
    returns (uint256)
    {
        return paymentRequests[paymentRequestID].amount;
    }

    function getPaymentRequestHistory()
    public
    view
    returns (PaymentRequest[] memory)
    {
        PaymentRequest[] memory paymentRequestArray = new PaymentRequest[](
            paymentRequestCount
        );
        for (uint256 i = 0; i < paymentRequestCount; i++) {
            paymentRequestArray[i] = paymentRequests[i];
        }
        return paymentRequestArray;
    }
}
