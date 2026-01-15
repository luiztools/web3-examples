import { createPublicClient, http, parseAbiItem } from "viem";
import { bscTestnet } from "viem/chains";

const transferEvent = parseAbiItem(`event Transfer(address indexed from, address indexed to, uint256 value)`);

const client = createPublicClient({
    chain: bscTestnet,
    transport: http()
});

const address = "0x94a9838528E1b0022c334D3c1c7D5e684c222B07";

console.log(`Monitoring Transfer at contract ${address}...\n`);

const unwatch = client.watchEvent({
    address,
    event: transferEvent,
    args: {
        to: "0x576906e0321cd8d57928aef6b3e9e81cd6d0ecef" // FILTRO DIRETO NO RPC
    },
    onLogs: (logs) => {
        for (const log of logs) {
            const { from, to, value } = log.args;
            console.log(`Transfer detected:`);
            console.log(`From: ${from}`);
            console.log(`To: ${to}`);
            console.log(`Value: ${value}`);
            console.log(`Tx: ${log.transactionHash}\n`);
        }
    },
});