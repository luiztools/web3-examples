//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract LuizCoin {
    uint256 private _totalSupply = 10000 * 10**18;
    string private _name = "LuizCoin";
    string private _symbol = "LUC";
    uint8 private _decimals = 18;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor() {
        _balances[msg.sender] = _totalSupply;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, "Insuficient balance.");
        _balances[to] += value;
        _balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        _allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(balanceOf(from) >= value, "Insufficient balance.");
        require(
            _allowances[from][msg.sender] >= value,
            "Insufficient allowance."
        );
        _balances[to] += value;
        _balances[from] -= value;
        _allowances[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
