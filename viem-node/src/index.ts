import "dotenv/config";

import { createPublicClient, http, formatEther, createWalletClient, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

async function getEthBalance(address: `0x${string}`) {
    const client = createPublicClient({
        chain: sepolia,
        transport: http(),
    })

    const balance = await client.getBalance({ address });
    console.log(formatEther(balance));
}
//getEthBalance(process.env.WALLET as `0x${string}`);

async function transferEth(to: `0x${string}`, value: string) {

    const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
    if (!privateKey) throw new Error("Defina PRIVATE_KEY no .env");

    // Conta do remetente
    const account = privateKeyToAccount(`0x${privateKey}`);

    // Cliente conectado à rede Sepolia
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http()
    });

    console.log(`Enviando ${value} ETH para ${to}...`);

    // Montar e assinar transação
    const hash = await client.sendTransaction({
        to,
        value: parseEther(value) // quantidade em ETH
    });

    console.log("Tx hash:", hash);
    console.log("Veja no block explorer: https://sepolia.etherscan.io/tx/" + hash);
}
//transferEth("0x576906e0321cd8d57928aef6b3e9e81cd6d0ecef", "0.001");

// PART 2

import ABI from './abi.json' with { type: "json" };

async function getRscBalance(address: `0x${string}`) {
    const client = createPublicClient({
        chain: sepolia,
        transport: http(),
    })

    const balance = await client.readContract({
        abi: ABI,
        address: process.env.CONTRACT_ADDRESS as `0x${string}`,
        functionName: "balanceOf",
        args: [address]
    })
    console.log(formatEther(balance as bigint));
}
//getRscBalance(process.env.WALLET as `0x${string}`);

async function approveRscTransfer(spender: `0x${string}`, value: bigint) {
    const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
    if (!privateKey) throw new Error("Defina PRIVATE_KEY no .env");

    // Conta de quem vai chamar o contrato
    const account = privateKeyToAccount(`0x${privateKey}`);

    // Cliente conectado à rede Sepolia
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http()
    });

    console.log(`Aprovando ${spender} na carteira ${process.env.WALLET}...`);

    // Montar e assinar transação
    const hash = await client.writeContract({
        abi: ABI,
        address: process.env.CONTRACT_ADDRESS as `0x${string}`,
        functionName: "approve",
        args: [spender, value],
    });

    console.log("Tx hash:", hash);
    console.log("Veja no block explorer: https://sepolia.etherscan.io/tx/" + hash);
}
//approveRscTransfer("0x0D1195969395B8a23dA37Dce78b823BE8cD5a0a4", 1000n);

