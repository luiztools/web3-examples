require('dotenv').config();
const ABI = require("./abi.json");

const { ethers } = require("ethers");
const provider = new ethers.InfuraProvider(
    process.env.NETWORK,
    process.env.INFURA_API_KEY
);

async function getEthBalance(from) {
    const balance = await provider.getBalance(from);
    console.log(ethers.formatEther(balance));
}
//getEthBalance(process.env.WALLET);

async function transferEth(to, value) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const tx = await signer.sendTransaction({ to, value });
    const receipt = await tx.wait();
    console.log(tx.hash);
    return tx.hash;
}
//transferEth("0x0D1195969395B8a23dA37Dce78b823BE8cD5a0a4", 1000);

async function getPrcBalance(from) {
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, provider);
    const balance = await contract.balanceOf(from);
    console.log(ethers.formatEther(balance));
}
//getPrcBalance("0xE4ffEEd88111e1DFCc3a852d9334C65e38BF2880");

async function approvePrcTransfer(spender, value) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, signer);

    const tx = await contract.approve(spender, value, {from: process.env.WALLET});
    const receipt = await tx.wait();
    console.log(tx.hash);
    return tx.hash;
}
//approvePrcTransfer("0x0D1195969395B8a23dA37Dce78b823BE8cD5a0a4", "1000");