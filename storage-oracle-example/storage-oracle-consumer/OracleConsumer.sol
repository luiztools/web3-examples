// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

struct Game {
    uint timestamp;
    string team1;
    uint8 score1;
    string team2;
    uint8 score2;
    uint8 winner;
}

interface IStorageOracle {
    function getGame(string calldata gameId) external view returns (Game memory);
}

contract OracleConsumer {
    address immutable owner;
    address public oracleAddress;
    
    constructor(){
        owner = msg.sender;
    }

    function setOracleAddress(address newAddress) public {
        require(msg.sender == owner, "Unauthorized");
        oracleAddress = newAddress;
    }

    //gameId = bytes32("TEAM1XTEAM2YYYYMMDDHHMM")
    function getGame(string calldata gameId) external view returns (Game memory) {
        return IStorageOracle(oracleAddress).getGame(gameId);
    }
}