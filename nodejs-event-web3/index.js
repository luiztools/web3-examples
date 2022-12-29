const ABI = require("./abi.json");
const Web3 = require("web3");
require("dotenv").config();

async function doListen() {
    const web3 = new Web3(process.env.WEBSOCKET_URL);
    const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);

    contract.events.Transfer({
        filter: {
            from: "0xE4ffEEd88111e1DFCc3a852d9334C65e38BF2880"
        },
        fromBlock: "latest"
    })
        .on('data', event => console.log("event: " + JSON.stringify(event)))
        .on('changed', changed => console.log("changed: " + changed))
        .on('error', err => console.error(err))
        .on('connected', str => console.log("connected: " + str));
}

doListen();