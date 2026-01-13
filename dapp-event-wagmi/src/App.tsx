import ABI from './abi.json';
import { useWatchContractEvent } from 'wagmi';

function App() {

  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: ABI,
    eventName: 'Transfer',
    args: {
      to: "0x576906e0321cd8d57928aef6b3e9e81cd6d0ecef"
    },
    onLogs(logs) {
      for (const log of logs) {
        const [from, to, value] = log.topics
        console.log('📩 Transfer detected:')
        console.log(`   From:    ${from}`)
        console.log(`   To:  ${to}`)
        console.log(`   Value: ${value}`)
        console.log('---------------------------')
      }
    },
  })

  return <div>Monitoring...</div>
}

export default App
