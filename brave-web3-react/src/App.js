import { useState } from 'react';
import Web3 from 'web3';

function App() {

  const [myAddress, setMyAddress] = useState("");
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState("");

  async function connect() {
    if (!window.ethereum)
      return setMessage('No Brave Wallet');

    setMessage(`Trying to connect and load balance...`);
    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) throw new Error('Wallet not found/allowed!');

    setMyAddress(accounts[0]);
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(web3.utils.fromWei(balance, "ether"));
    setMessage(``);
  }

  async function transfer() {
    setMessage(`Trying to transfer ${quantity} to ${toAddress}...`);

    const web3 = new Web3(window.ethereum);
    const value = web3.utils.toWei(quantity, "ether");

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); 
    const transaction = { from: myAddress, to: toAddress, value, gas: 21000, nonce }; 
    const tx = await web3.eth.sendTransaction(transaction); 
    setMessage(JSON.stringify(tx));
  }

  return (
    <div>
      <p>
        My Address : <input type="text" value={myAddress} onChange={evt => setMyAddress(evt.target.value)} />
        <input type="button" value="Connect" onClick={evt => connect()} />
      </p>
      <p>
        Balance (BNB): {balance}
      </p>
      <hr />
      <p>
        To Address: <input type="text" onChange={evt => setToAddress(evt.target.value)} />
      </p>
      <p>
        Qty: <input type="text" onChange={evt => setQuantity(evt.target.value)} />
      </p>
      <p>
        <input type="button" value="Transfer" onClick={evt => transfer()} />
      </p>
      <hr />
      <p>
        {message}
      </p>
    </div >
  );
}

export default App;
