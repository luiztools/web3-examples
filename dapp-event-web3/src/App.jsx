import Web3 from 'web3';
import ABI from './abi.json';

function App() {
  async function doListen() {
    const web3 = new Web3(import.meta.env.VITE_WEBSOCKET_URL);
    const contract = new web3.eth.Contract(ABI, import.meta.env.VITE_CONTRACT_ADDRESS);

    contract.events.Transfer({
      filter: { to: "0x576906e0321cd8d57928aef6b3e9e81cd6d0ecef" },
      fromBlock: "latest"
    })
      .on('data', console.log)
  }

  function btnClick() {
    doListen()
      .then(() => console.log("listening"))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <button type='button' onClick={btnClick}>Listen Event</button>
    </div>
  );
}

export default App
