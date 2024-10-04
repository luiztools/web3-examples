const nextTry = {};//wallet para timestamp
const ips = {};//ip para wallet

function ipCheck(clientIP, wallet) {
    const walletByIp = ips[clientIP];
    if (walletByIp && walletByIp !== wallet)
        throw new Error(`IP do usuário e carteira não conferem.`);

    ips[clientIP] = wallet;
    return true;
}

function tryCheck(wallet) {
    const nextTimestamp = nextTry[wallet];

    if (nextTimestamp > Date.now())
        throw new Error(`Tente novamente após ${new Date(nextTimestamp)}`);

    nextTry[wallet] = nextTimestamp + parseInt(process.env.INTERVAL);//1d
    return true;
}

module.exports = {
    ipCheck,
    tryCheck
}