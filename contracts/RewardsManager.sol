// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./TTPSC.sol";
import "./PaymentsManager.sol";

contract RewardsManager {
    address owner;

    TTPSC public token;
    PaymentsManager public paymentsManager;

    mapping(uint256 => Reward) public rewards;
    mapping(bytes32 => bool) public rewardsHashes;
    mapping(address => mapping(uint256 => uint256)) public orders;
    mapping(address => mapping(uint256 => uint256)) public collected;

    uint256 rewardCount;

    struct Reward {
        string shop;
        string name;
        uint32 value;
        uint256 price;
        uint256 inStock;
    }

    event OrderPlaced(
        address indexed user,
        uint256 indexed rewardId,
        uint256 _quantity
    );
    event OrderCollected(
        address indexed user,
        uint256 indexed rewardId,
        uint256 _quantity
    );
    event NewReward(
        string _shop,
        string name,
        uint32 value,
        uint256 price,
        uint256 inStock
    );
    event InStockChanged(
        uint256 indexed rewardId,
        uint256 inStock
    );
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    constructor(PaymentsManager _paymentsManager) {
        owner = msg.sender;
        token = _paymentsManager.token();
        paymentsManager = _paymentsManager;
        rewardCount = 0;
    }

    function addReward(
        string memory _shop,
        string memory _name,
        uint32 _value,
        uint256 _price,
        uint256 _inStock
    ) public {
        require(paymentsManager.isEmployer(msg.sender), "Only employer can add new reward.");

        bytes32 hash = keccak256(abi.encodePacked(_name, _value, _shop));
        require(!rewardsHashes[hash], "A reward with the same name, value and shop already exists");

        rewardsHashes[hash] = true;
        rewards[rewardCount] = Reward(
            _shop,
            _name,
            _value,
            _price,
            _inStock
        );

        rewardCount++;

        emit NewReward(_shop, _name, _value, _price, _inStock);
    }

    function changeInStock(uint256 _rewardId, uint256 _inStock) public {
        require(paymentsManager.isEmployer(msg.sender), "Only employer can change stock count.");
        rewards[_rewardId].inStock = _inStock;
        emit InStockChanged(_rewardId, _inStock);
    }

    function placeOrder(uint256 _rewardId, uint256 _quantity) public {
        require(
            paymentsManager.isCurrentEmployee(msg.sender),
            "Only current employee can exchange tokens."
        );
        require(
            _rewardId < rewardCount,
            "Reward with given ID does not exists"
        );
        require(
            token.allowance(msg.sender, address(this)) >=
            rewards[_rewardId].price * _quantity,
            "You must approve this contract address to spend your tokens."
        );
        require(
            rewards[_rewardId].inStock > _quantity,
            "No enough quantity in stock"
        );

        token.transferFrom(
            msg.sender,
            address(paymentsManager),
            rewards[_rewardId].price
        );

        rewards[_rewardId].inStock -= _quantity;
        orders[msg.sender][_rewardId] += _quantity;

        emit OrderPlaced(msg.sender, _rewardId, _quantity);
    }

    function markCollected(
        address user,
        uint256 _rewardId,
        uint256 _quantity
    ) public {
        require(
            paymentsManager.isEmployer(msg.sender),
            "Only employeer can mark orders as collected."
        );
        require(
            orders[user][_rewardId] > collected[user][_rewardId],
            "This order has not been placed or has already been collected."
        );
        collected[user][_rewardId] += _quantity;

        emit OrderCollected(user, _rewardId, _quantity);
    }

    function getInStock(uint256 _rewardId) public view returns (uint256) {
        return rewards[_rewardId].inStock;
    }

    function getAllRewards() public view returns (Reward[] memory) {
        Reward[] memory result = new Reward[](rewardCount);
        for (uint256 i = 0; i < rewardCount; i++) {
            result[i] = rewards[i];
        }
        return result;
    }

    function getAllPendingOrders(address user)
    public
    view
    returns (Reward[] memory, uint256[] memory)
    {
        Reward[] memory rewardsArray = new Reward[](rewardCount);
        uint256[] memory pendingArray = new uint256[](rewardCount);
        for (uint256 i = 0; i < rewardCount; i++) {
            rewardsArray[i] = rewards[i];
            if (orders[user][i] > 0) {
                pendingArray[i] = orders[user][i] - collected[user][i];
            } else {
                pendingArray[i] = 0;
            }
        }
        return (rewardsArray, pendingArray);
    }

    function getOrderStatus(address user, uint256 _rewardId)
    public
    view
    returns (uint256)
    {
        return orders[user][_rewardId];
    }

    function getPendingOrdersCount(address user, uint256 _rewardId)
    public
    view
    returns (uint256)
    {
        return orders[user][_rewardId] - collected[user][_rewardId];
    }
}
