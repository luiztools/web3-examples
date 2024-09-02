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

contract StorageOracle {
    address immutable owner;
    //gameId = "TEAM1XTEAM2YYYYMMDDHHMM"
    mapping(bytes32 => Game) allGames;

    constructor() {
        owner = msg.sender;
    }

    function getGame(string calldata gameId) external view returns (Game memory) {
        return allGames[keccak256(abi.encodePacked(gameId))];
    }

    function setGame(string calldata gameId, Game calldata newGame) external {
        require(msg.sender == owner, "Unauthorized");
        allGames[keccak256(abi.encodePacked(gameId))] = newGame;
    }
}