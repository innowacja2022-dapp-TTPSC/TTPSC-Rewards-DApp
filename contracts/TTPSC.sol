//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.8/contracts/token/ERC20/ERC20.sol";

contract TTPSC is ERC20 {
    address public owner;

    constructor(string memory _NAME, string memory _SYMBOL, uint256 initialSupply)
    ERC20(_NAME, _SYMBOL)
    {
        owner = msg.sender;
        mint(msg.sender, initialSupply);
    }

    function mint(address _to, uint256 _value) public {
        require(
            msg.sender == owner,
            "Only the owner can mint new TTPSC tokens."
        );
        _mint(_to, _value);
    }
}
