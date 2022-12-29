import './App.css';
import Web3 from 'web3';
import ABI from './abi.json';

function App() {

  async function doListen() {
    const web3 = new Web3(process.env.REACT_APP_WEBSOCKET_URL);
    const contract = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT_ADDRESS);
    
    contract.events.Transfer({
      fromBlock: "latest"
    })
      .on('data', event => console.log("event: " + JSON.stringify(event)))
      .on('changed', changed => console.log("changed: " + changed))
      .on('error', err => console.error(err))
      .on('connected', str => console.log("connected: " + str));
  }

  function btnClick() {
    doListen()
      .then(() => console.log("fire"))
      .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button type='button' onClick={btnClick}>Listen Event</button>
      </header>
    </div>
  );
}

export default App;
