import { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, isAddress } from 'viem'

export default function Transfer() {
    const { isConnected } = useAccount()
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const { data: hash, isPending, sendTransaction, error } = useSendTransaction()

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

    function btnTransferClick() {
        if (!isConnected) return alert('Wallet not connected.')
        if (!isAddress(to)) return alert('Invalid address.')
        if (!amount || Number(amount) <= 0) return alert('Invalid amount.')

        sendTransaction({
            to,
            value: parseEther(amount),
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
            <h2>Transfer ETH</h2>
            {!isConnected && <div>First connect your wallet.</div>}

            <input
                type="text"
                placeholder="0xTarget..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />

            <input
                type="number"
                placeholder="ETH Value"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={btnTransferClick} disabled={isPending || !isConnected}>
                {isPending ? 'Sending...' : 'Send ETH'}
            </button>

            {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
            {isLoading && <div>Confirming transaction...</div>}
            {isSuccess && <div>Transaction confirmed! 🎉 Hash: {hash}</div>}
        </div>
    )
}
