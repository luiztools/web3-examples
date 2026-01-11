import { Abi } from "viem";
import Connection from "./Connection";
import Search from "./Search";
import Form from "./Form";

import ABI from './abi.json';

const CONTRACT_ADDRESS = '0x31d20731446bdd56b114d9699d392f3a67171f85';

function App() {
  return (
    <>
      <Connection />
      <Search abi={ABI as Abi} address={CONTRACT_ADDRESS} />
      <Form abi={ABI as Abi} address={CONTRACT_ADDRESS} />
    </>
  )
}

export default App
