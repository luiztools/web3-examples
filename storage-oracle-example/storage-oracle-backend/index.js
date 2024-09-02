require("dotenv").config();

const { ethers } = require("ethers");
const ABI = require("./abi.json");
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_NODE);
const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

const express = require("express");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
    const { gameId, newGame } = req.body;

    const tx = await contract.setGame(gameId, {
        ...newGame,
        timestamp: Date.now() / 1000
    });
    await tx.wait();
    res.json(tx);
})

app.listen(process.env.PORT, () => console.log("Server is running."));