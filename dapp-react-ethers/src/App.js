import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from './abi.json';
import './App.css';

function App() {

  const [customerId, setCustomerId] = useState("0");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const CONTRACT_ADDRESS = "0xE9956c971B72aD74F249E616828df613F03E858b";

  async function getProvider() {
    if (!window.ethereum) throw new Error(`No MetaMask found!`);

    const provider = new ethers.BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);
    if (!accounts || !accounts.length) throw new Error('Wallet not found/allowed!');
    return provider;
  }

  async function doSearch() {
    try {
      const provider = await getProvider();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const customer = await contract.getCustomer(customerId);
      alert(JSON.stringify(customer));
    } catch (err) {
      setError(err.message);
    }
  }

  async function getContractSigner() {
    const provider = await getProvider();
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    return contract.connect(signer);
  }

  async function doSave() {
    try {
      const contract = await getContractSigner();
      const tx = await contract.addCustomer({ name, age });
      alert(JSON.stringify(tx));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSearchClick() {
    setError('');
    doSearch();
  }

  function onSaveClick() {
    setError('');
    doSave();
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
