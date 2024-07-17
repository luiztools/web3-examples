//index.js
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const WalletService = require("./WalletService");
let myAddress = "";

function menu() {
    setTimeout(() => {
        console.clear();

        if (myAddress)
            console.log(`You are logged as ${myAddress}`);
        else
            console.log(`You aren't logged.`);

        console.log("1 - Create Wallet");
        console.log("2 - Recover Wallet");
        console.log("3 - Balance");
        console.log("4 - Send BTC");
        console.log("5 - Search tx");
        rl.question("Choose your option: ", (answer) => {
            switch (answer) {
                case "1": createWallet(); break;
                case "2": recoverWallet(); break;
                case "3": getBalance(); break;
                case "4": sendBtc(); break;
                case "5": searchTx(); break;
                default: {
                    console.log('Wrong option!');
                    menu();
                }
            }
        })

    }, 1000)
}

menu();

function preMenu() {
    rl.question(`Press any key to continue...`, () => {
        menu();
    })
}

function createWallet() {
    console.clear();

    const myWallet = WalletService.createWallet();
    myAddress = myWallet.address;

    console.log(`Your new wallet:`);
    console.log(myAddress);

    preMenu();
}