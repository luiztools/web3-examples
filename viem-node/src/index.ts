import "dotenv/config";

import { createPublicClient, http, formatEther } from "viem";
import { sepolia } from "viem/chains";

async function getEthBalance(address: `0x${string}`) {
    const client = createPublicClient({
        chain: sepolia,
        transport: http(),
    })

    const balance = await client.getBalance({ address });
    console.log(formatEther(balance));
}

//getEthBalance(process.env.WALLET as `0x${string}`);

import { createWalletClient, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

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
transferEth("0x576906e0321cd8d57928aef6b3e9e81cd6d0ecef", "0.001");