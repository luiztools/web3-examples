const { ethers } = require("ethers");
require("dotenv").config();

async function doListen() {
    const provider = new ethers.WebSocketProvider(process.env.WEBSOCKET_URL);

    const filter = {
        address: process.env.CONTRACT_ADDRESS,
        topics: [
            ethers.id("Transfer(address,address,uint256)")
        ]
    }
    provider.on(filter, () => {
        console.log('fire transfer')
    });
}

doListen();