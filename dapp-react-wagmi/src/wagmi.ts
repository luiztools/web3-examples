import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
