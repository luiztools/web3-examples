import { useState } from 'react';
import { getTokenBalance, getPolBalance, transferPol, transferToken } from './Web3Service';

function App() {

  const [address, setAddress] = useState("0xE4ffEEd88111e1DFCc3a852d9334C65e38BF2880");
  const [contract, setContract] = useState("POL");
  const [balance, setBalance] = useState('');

  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState('');

  async function checkBalance() {
    let balance;

    if (contract === "POL")
      balance = await getPolBalance(address);
    else if (contract === "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582")//USDC
      balance = await getTokenBalance(address, contract, 6);
    else
      balance = await getTokenBalance(address, contract);

    setBalance(balance);
    setMessage(``);
  }

  async function transfer() {
    let tx;
    if (contract === "POL")
      tx = await transferPol(toAddress, quantity);
    else if (contract === "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582")//USDC
      tx = await transferToken(toAddress, contract, quantity, 6);
    else
      tx = await transferToken(toAddress, contract, quantity);

    setMessage(tx);
  }

  return (
    <div>
      <p>
        My Address : <input type="text" onChange={evt => setAddress(evt.target.value)} value={address} />
      </p>
      <p>
        <select className="form-select" onChange={evt => setContract(evt.target.value)}>
          <option value="POL">POL</option>
          <option value="0xa5733b3a8e62a8faf43b0376d5faf46e89b3033e">WPOL</option>
          <option value="0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582">USDC</option>
        </select>
        <input type="button" value="See Balance" onClick={evt => checkBalance()} />
      </p>
      <p>
        Balance: {balance}
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
