import { useState } from 'react';
import Web3 from 'web3';
import ABI from './abi.json';

function App() {

  const [bookId, setBookId] = useState("0");
  const [error, setError] = useState("");

  const CONTRACT_ADDRESS = "0x31d20731446bdd56b114d9699d392f3a67171f85";

  async function getContract() {
    if (!window.ethereum) return setError(`No MetaMask found!`);

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
  }

  function bigIntReplacer(key, value) {
    return typeof value === 'bigint' ? value.toString() : value;
  }

  async function doSearch() {
    try {
      const contract = await getContract();
      const book = await contract.methods.getBook(bookId).call();
      alert(JSON.stringify(book, bigIntReplacer));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSearchClick() {
    setError('');
    doSearch();
  }

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  async function doSave() {
    try {
      const contract = await getContract();
      const tx = await contract.methods.addBook({ title, year }).send();
      alert(JSON.stringify(tx, bigIntReplacer));
    } catch (err) {
      setError(err.message);
    }
  }

  function onSaveClick() {
    doSave();
  }

  return (
    <div>
      <p>
        <label>Book ID: <input type="number" value={bookId} onChange={(evt) => setBookId(evt.target.value)} /></label>
      </p>
      <p>
        <input type="button" value="Search" onClick={onSearchClick} />
      </p>
      <hr />
      <p>
        <label>Title: <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value)} /></label>
      </p>
      <p>
        <label>Year: <input type="number" value={year} onChange={(evt) => setYear(evt.target.value)} /></label>
      </p>
      <p>
        <input type="button" value="Save" onClick={onSaveClick} />
      </p>
      <p>
        {error}
      </p>
    </div>
  );
}

export default App;
