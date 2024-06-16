import { ethers } from 'ethers';

import CONTRACT_ABI from "./ABI.json";

async function getMetaMaskProvider() {
    if (!window.ethereum) throw new Error(`No MetaMask found!`);
    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send('eth_requestAccounts');
    if(!accounts || !accounts.length) throw new Error(`No MetaMask account allowed`);
    
    return provider;
}

export async function getBnbBalance(address) {
    const provider = await getMetaMaskProvider();
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance.toString());
}

export async function transferBnb(toAddress, quantity) {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner();
    ethers.getAddress(toAddress);//valida endereço

    const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(quantity)
    })
    await tx.wait();

    return tx;
}

export async function getTokenBalance(address, contractAddress, decimals = 18) {
    const provider = await getMetaMaskProvider();
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
    const balance = await contract.balanceOf(address);

    return ethers.formatUnits(balance, decimals);
}

export async function transferToken(toAddress, contractAddress, quantity, decimals = 18) {
    const provider = await getMetaMaskProvider();
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

    ethers.getAddress(toAddress);//valida endereço

    const tx = await contract.transfer(toAddress, ethers.parseUnits(quantity, decimals));
    await tx.wait();

    return tx;
}

export async function getTransaction(hash){
    const provider = await getMetaMaskProvider();
    const tx = await provider.getTransactionReceipt(hash);
    return tx;
}