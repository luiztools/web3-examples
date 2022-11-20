import { useState } from 'react';
import Web3 from 'web3';
import ABI from './abi.json';
import './App.css';

function App() {

  const [customerId, setCustomerId] = useState("0");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const CONTRACT_ADDRESS = "0xE9956c971B72aD74F249E616828df613F03E858b";

  async function getContract() {
    if (!window.ethereum) return setError(`No MetaMask found!`);

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
  }

  async function doSave() {
    try {
      const contract = await getContract();
      const tx = await contract.methods.addCustomer({ name, age }).send();
      alert(JSON.stringify(tx));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSaveClick() {
    doSave();
  }

  async function doSearch() {
    try {
      const contract = await getContract();
      const customer = await contract.methods.getCustomer(customerId).call();
      alert(JSON.stringify(customer));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSearchClick() {
    setError('');
    doSearch();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <label>Customer ID: <input type="number" value={customerId} onChange={(evt) => setCustomerId(evt.target.value)} /></label>
        </p>
        <p>
          <input type="button" value="Search" onClick={onSearchClick} />
        </p>
        <hr />
        <p>
          <label>Name: <input type="text" value={name} onChange={(evt) => setName(evt.target.value)} /></label>
        </p>
        <p>
          <label>Age: <input type="number" value={age} onChange={(evt) => setAge(evt.target.value)} /></label>
        </p>
        <p>
          <input type="button" value="Save" onClick={onSaveClick} />
        </p>
        <p>
          {error}
        </p>
      </header>
    </div>
  );
}

export default App;
