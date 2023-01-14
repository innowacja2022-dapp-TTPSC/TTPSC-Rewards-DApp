// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./GiftCard.sol";
import "./TTPSC.sol";

contract GiftCardFactory {
    TTPSC public tokenAddress;

    address public owner;

    uint256 public shopsCount;

    mapping(uint256 => GiftCardInfo) public giftCards;

    struct GiftCardInfo {
        string name;
        uint256 price;
        GiftCard addr;
    }

    constructor(TTPSC _ttpscAddress) {
        tokenAddress = _ttpscAddress;
        owner = msg.sender;
    }

    function createGiftCard(string memory name_, uint256 price_) public {
        require(msg.sender == owner, "Only owner can create GiftCard");

        shopsCount++;
        GiftCard giftCard = new GiftCard(tokenAddress, name_, price_);

        giftCards[shopsCount].name = name_;
        giftCards[shopsCount].price = price_;
        giftCards[shopsCount].addr = giftCard;
    }

    function getGiftCard(uint256 _shopId)
    public
    view
    returns (GiftCardInfo memory)
    {
        return giftCards[_shopId];
    }
}