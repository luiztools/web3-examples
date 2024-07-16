const BIP32Factory = require("bip32");
const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory.default(ecc);

const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const network = bitcoin.networks.testnet;//bitcoin é a mainnet

//derivação de carteiras HD - Hierarquical Deterministic - o 1 indica testnet, ou 0 para mainnet
const path = "m/49'/1'/0'/0";

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira gerada!");
console.log("Endereço: ", btcAddress);
console.log("Chave Privada: ", node.toWIF());
console.log("Seed: ", mnemonic);