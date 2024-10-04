require("dotenv").config();

const express = require('express');
const morgan = require('morgan');

const { withdraw } = require('./Web3Provider');
const { ipCheck, tryCheck } = require("./SecurityProvider");

const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.json({ mesage: "Hello World" });
})

app.post("/withdraw/:wallet", async (req, res) => {

    try {
        ipCheck(`${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`, req.params.wallet);
        tryCheck(req.params.wallet);

        const tx = await withdraw(req.params.wallet);
        res.json({
            tx,
            amount: process.env.TOKEN_AMOUNT
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
})

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log("Server is listening at " + PORT));