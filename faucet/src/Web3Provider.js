const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_NODE);
const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

async function withdraw(clientWallet) {

    const value = ethers.parseEther(`${process.env.TOKEN_AMOUNT}`);
    const balance = await provider.getBalance(clientWallet);
    if (balance >= (value / 2n))
        throw new Error(`You already have enough tokens.`);

    const tx = await signer.sendTransaction({
        from: process.env.WALLET,
        to: clientWallet,
        value
    });

    return tx.hash;
}

module.exports = { withdraw }