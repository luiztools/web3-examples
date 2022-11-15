//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuizCoin is ERC20 {
	address public admin;

	constructor() ERC20("LuizCoin", "LUC"){
		_mint(msg.sender, 1000 * 10 ** 18);
	}
}
