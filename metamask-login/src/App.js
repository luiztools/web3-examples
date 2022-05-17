import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { doSignInBackend, doSignOutBackend, doSignUpBackend, getProfileBackend } from './AppService';

function App() {

  const CHALLENGE = process.env.REACT_APP_CHALLENGE;

  const [wallet, setWallet] = useState('');
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const address = localStorage.getItem('wallet');
    setWallet(address);

    if (address) doSignIn();
  }, [])

  async function connect() {
    setError('');

    if (!window.ethereum) return setError(`No MetaMask found!`);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    localStorage.setItem('wallet', accounts[0]);

    setWallet(accounts[0]);

    const signer = provider.getSigner();
    const secret = await signer.signMessage(CHALLENGE);

    return { user: accounts[0], secret };
  }

  async function loadProfile(token) {
    const profile = await getProfileBackend(token)
    setProfile(profile);
  }

  function doSignUp() {
    connect()
      .then(credentials => doSignUpBackend(credentials))
      .then(result => localStorage.setItem('token', result.token))
      .catch(err => setError(err.message))
  }

  function doSignIn() {
    connect()
      .then(credentials => doSignInBackend(credentials))
      .then(result => {
        localStorage.setItem('token', result.token);
        loadProfile(result.token);
      })
      .catch(err => setError(err.message))
  }

  function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(wallet)
      .then(balance => setBalance(ethers.utils.formatEther(balance.toString())))
      .catch(err => setError(err.message))
  }

  function doLogout() {
    setError('');

    const token = localStorage.getItem('token');
    doSignOutBackend(token)
      .then(response => {
        localStorage.removeItem('wallet');
        localStorage.removeItem('token');
        setWallet('');
        setBalance('');
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <div>
          {
            !wallet
              ? (
                <>
                  <button onClick={doSignIn}>
                    Sign In with MetaMask
                  </button>
                  <button onClick={doSignUp}>
                    Sign Up with MetaMask
                  </button>
                </>
              )
              : (
                <>
                  <p>
                    Wallet: {wallet}
                  </p>
                  <p>
                    Name: {profile.name}
                  </p>
                  <p>
                    <button onClick={getBalance}>
                      See Balance
                    </button> {balance}
                  </p>
                  <button onClick={doLogout}>
                    Logout
                  </button>
                </>
              )
          }
          {
            error ? <p>{error}</p> : <></>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
