require('dotenv').config();
const ABI = require("./abi.json");

const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);

//additional lines if you want to send transactions
const account = web3.eth.accounts.privateKeyToAccount('0x' + process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

async function getPrcBalance(from) {
    const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);
    const balance = await contract.methods.balanceOf(from).call();
    console.log(web3.utils.fromWei(balance));
}

//getPrcBalance("0xE4ffEEd88111e1DFCc3a852d9334C65e38BF2880");

async function approvePrcTransfer(spender, value) {
    const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS, { from: process.env.WALLET });
    const tx = await contract.methods.approve(spender, value).send();
    console.log(tx.transactionHash);
    return tx;
}

approvePrcTransfer("0x0D1195969395B8a23dA37Dce78b823BE8cD5a0a4", "1000");

async function getEthBalance(from) {
    const balance = await web3.eth.getBalance(from);
    console.log(web3.utils.fromWei(balance));
}

async function transferEth(to, value) {
    const nonce = await web3.eth.getTransactionCount(process.env.WALLET, 'latest');

    const transaction = {
        to,
        value,
        gas: 21000,
        nonce
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY);

    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(tx.transactionHash)
    return tx.transactionHash;
}

//transferEth("0x0D1195969395B8a23dA37Dce78b823BE8cD5a0a4", 1000);