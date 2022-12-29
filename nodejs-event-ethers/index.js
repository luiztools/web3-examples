const { ethers } = require("ethers");
require("dotenv").config();

async function doListen() {
    const provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_URL);

    const filter = {
        address: process.env.CONTRACT_ADDRESS,
        topics: [
            ethers.utils.id("Transfer(address,address,uint256)")
        ]
    }
    provider.on(filter, () => {
        console.log('fire transfer')
    });
}

doListen();