import { ethers } from 'ethers';

function App() {

  async function doListen() {
    const provider = new ethers.WebSocketProvider(import.meta.env.VITE_WEBSOCKET_URL);

    const filter = {
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
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
    <div>
      <button type='button' onClick={btnClick}>Listen Event</button>
    </div>
  );
}

export default App
