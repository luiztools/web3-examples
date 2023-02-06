import { ethers } from 'ethers';
import './App.css';

function App() {

  async function doListen() {
    const provider = new ethers.WebSocketProvider(process.env.REACT_APP_WEBSOCKET_URL);

    const filter = {
      address: process.env.REACT_APP_CONTRACT_ADDRESS,
      topics: [
        ethers.id("Transfer(address,address,uint256)")
      ]
    }
    provider.on(filter, () => {
      console.log('fire transfer')
    });
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
