// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./TTPSC.sol";

contract GiftCard {

    TTPSC public ttpscAddress;

    address public owner;

    uint256 price;

    string name;

    bool public active;

    enum State {
        UNCLAIMED,
        CLAIMED
    }

    uint256 public giftCardsCount;
    mapping(uint256 => State) public states;

    constructor(
        TTPSC _ttpscAddress,
        string memory _name,
        uint256 _price
    ) {
        ttpscAddress = _ttpscAddress;
        owner = msg.sender;
        name = _name;
        price = _price;
        active = true;
    }

    function purchase(uint256 _value) public {
        require(
            active,
            "The offer is not active"
        );

        require(
            ERC20(address(this)).allowance(msg.sender, address(this)) >= _value,
            "The caller has not approved the gift card contract to transfer the tokens"
        );

        ERC20(address(this)).transferFrom(msg.sender, address(this), _value);

        states
        [giftCardsCount++] = State.UNCLAIMED;
    }

    function markGiftCardAsCollected(uint256 _id) public {
        require(
            msg.sender == owner,
            "No permission to exchange card"
        );

        require(
            states
            [_id] == State.UNCLAIMED,
            "Gift card has already been claimed or used"
        );

        states
        [_id] = State.CLAIMED;
    }

    function setActive(bool _active) public {
        require(
            msg.sender == owner,
            "Only Owner can enable/disable the offer"
        );

        active = _active;
    }
}