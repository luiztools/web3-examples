import { useState } from 'react';
import { readContract } from '@wagmi/core';
import { useConfig } from 'wagmi';
import { Abi } from 'viem';

export default function Search(props: { address: `0x${string}`, abi: Abi }) {
    const config = useConfig();

    const [bookId, setBookId] = useState('');
    const [bookData, setBookData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function btnSearchClick() {
        if (!bookId) {
            setError('Informe um ID válido.');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const result = await readContract(config, {
                address: props.address,
                abi: props.abi,
                functionName: 'getBook',
                args: [BigInt(bookId)],
            })

            setBookData(result);
        } catch (err: any) {
            setError(err.message);
        }

        setIsLoading(false);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
            <h2>Search</h2>
            <input
                type="number"
                placeholder="Book ID:"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)} />

            <button onClick={btnSearchClick} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search Book'}
            </button>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}

            {bookData && (
                <div style={{ border: '1px solid #ccc', padding: 8 }}>
                    <h3>Book Data:</h3>
                    <pre>{JSON.stringify(bookData, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
