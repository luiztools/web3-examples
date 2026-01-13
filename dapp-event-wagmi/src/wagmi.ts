import { createConfig, webSocket } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: webSocket(),
    [bscTestnet.id]: webSocket(import.meta.env.VITE_WEBSOCKET_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
