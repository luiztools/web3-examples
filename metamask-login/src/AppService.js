export function doSignUpBackend(credentials){
    return new Promise((resolve, reject) => {
        return resolve({ token: 'abc123' });
    })
}

export function doSignInBackend(credentials) {
    return new Promise((resolve, reject) => {
        if (credentials.user === '0x9cd29e15d5647e702696c90d64dfb31425738c06'
        &&credentials.secret === '0x3e60174888e4e6a4d44bed2b7f8e8b4e9f6adecf1083e10d70770573a25bd6406108ccb27818826230d19a75fdc78f34ae89c92d7a2ba97eaee5cf106e50cb9c1b' )
            return resolve({ token: 'abc123' });
        return reject(`401 Unauthorized`);
    })
}

export function doSignOutBackend(token) {
    return new Promise((resolve, reject) => {
        if (token === 'abc123')
            return resolve({ token: null });
        return reject(`401 Unauthorized`);
    })
}

export function getProfileBackend(token) {
    return new Promise((resolve, reject) => {
        if (token === 'abc123')
            return resolve({ name: 'Luiz' });
        return reject(`401 Unauthorized`);
    })
}