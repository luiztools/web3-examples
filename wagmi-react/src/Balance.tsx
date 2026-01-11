import { useAccount, useBalance } from 'wagmi'
import { formatUnits } from 'viem'

export function Balance() {
    const { address, isConnected } = useAccount()
    const { data, status } = useBalance({ address })

    if (!isConnected) return <div>Wallet not connected</div>
    if (status === 'pending') return <div>Loading balance...</div>

    return (
        <div>
            <strong>Balance:</strong> {data ? formatUnits(data.value, data.decimals) : "0"} {data?.symbol}
        </div>
    )
}
