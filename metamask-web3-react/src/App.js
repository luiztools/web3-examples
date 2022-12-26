import { useState } from 'react';
import { getEthBalance, transferEth } from './MetaMaskService';

function App() {

  const [address, setAddress] = useState("0xE4ffEEd88111e1DFCc3a852d9334C65e38BF2880");
  const [balance, setBalance] = useState('');
  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState('');

  async function checkBalance() {
    try {
      setMessage("");
      let balance = await getEthBalance(address);
      setBalance(balance);
    }
    catch (err) {
      setMessage(err.message);
    }
  }

  async function transfer() {
    try {
      setMessage("");
      let result = await transferEth(address, toAddress, quantity);
      setMessage(JSON.stringify(result));
    }
    catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div>
      <p>
        My Address : <input type="text" onChange={evt => setAddress(evt.target.value)} value={address} />
      </p>
      <p>
        Balance: {balance}
      </p>
      <p><input type="button" value="Balance" onClick={evt => checkBalance()} /></p>
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
