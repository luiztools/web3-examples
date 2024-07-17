import Web3 from 'web3';
import CONTRACT_ABI from "./ABI.json";

async function connect() {
    if (!window.ethereum) throw new Error('No Brave Wallet');

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error('Wallet not found/allowed!');

    return web3;
}

export async function getBnbBalance(address) {
    const web3 = await connect();
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, "ether");
}

export async function transferBnb(toAddress, quantity) {
    const web3 = await connect();
    const myAddress = window.ethereum.selectedAddress;
    const value = web3.utils.toWei(quantity, "ether");
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest');
    const transaction = { from: myAddress, to: toAddress, value, gas: 21000, nonce };
    return web3.eth.sendTransaction(transaction);
}

export async function getTokenBalance(address, contractAddress) {
    const web3 = await connect();
    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress); 
    const balance = await contract.methods.balanceOf(address).call();
    return web3.utils.fromWei(balance, "ether");
}

export async function transferToken(toAddress, contractAddress, quantity) {
    const web3 = await connect();
    const from = window.ethereum.selectedAddress;
    const value = web3.utils.toWei(quantity, "ether");
    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress, { from }); 
    return contract.methods.transfer(toAddress, value).send();
}