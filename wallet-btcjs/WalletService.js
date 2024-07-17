//WalletService.js
const BIP32Factory = require("bip32");
const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory.default(ecc);

const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const NETWORK = bitcoin.networks.testnet;//ou mainnet
const PATH = "m/49'/1'/0'/0";//o /1 indica testnet, ou /0 para mainnet

let myWallet = null;

function createWallet() {
    let mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    let root = bip32.fromSeed(seed, NETWORK);

    let account = root.derivePath(PATH);
    let node = account.derive(0).derive(0);

    let address = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: NETWORK
    }).address;

    myWallet = {
        address,
        privateKey: node.toWIF()
    }

    return myWallet;
}

function recoverFromMnemonic(mnemonic) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    return bip32.fromSeed(seed, NETWORK);
}

function recoverFromPrivateKey(privateKey) {
    let ONES = Buffer.alloc(32, 1)
    return bip32.fromPrivateKey(Buffer.from(privateKey, 'hex'), ONES, NETWORK);
}

function recoverWallet(pkOrMnemonic) {
    const root = pkOrMnemonic.indexOf(" ") !== -1
        ? recoverFromMnemonic(pkOrMnemonic)
        : recoverFromPrivateKey(pkOrMnemonic);

    let account = root.derivePath(PATH);
    let node = account.derive(0).derive(0);

    let address = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: NETWORK
    }).address;

    myWallet = {
        address,
        privateKey: node.toWIF()
    }

    return myWallet;
}

module.exports = {
    createWallet,
    recoverWallet
}