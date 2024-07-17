import { useState } from 'react';
import { getBnbBalance, transferBnb, getTokenBalance, transferToken } from "./BraveService";

function App() {

  const [address, setAddress] = useState("0x7C3aEBdD11A2a86270db7a43CA9762f78bED9E0C");
  const [contract, setContract] = useState("BNB");
  const [balance, setBalance] = useState('');

  const [toAddress, setToAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState('');

  async function checkBalance() {
    let balance;

    if (contract === "BNB")
      balance = await getBnbBalance(address);
    else
      balance = await getTokenBalance(address, contract);

    setBalance(balance);
    setMessage(``);
  }

  async function transfer() {
    let result;
    if (contract === "BNB")
      result = await transferBnb(toAddress, quantity);
    else
      result = await transferToken(toAddress, contract, quantity);

    setMessage(result.transactionHash);
  }

  return (
    <div>
      <p>
        My Address : <input type="text" value={address} onChange={evt => setAddress(evt.target.value)} />
      </p>
      <p>
        <select className="form-select" onChange={evt => setContract(evt.target.value)}>
          <option value="BNB">BNB</option>
          <option value="0x53598858bC64f5f798B3AcB7F82FF2CB2aF463bf">BTC</option>
          <option value="0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378">ETH</option>
          <option value="0x64544969ed7EBf5f083679233325356EbE738930">USDC</option>
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
