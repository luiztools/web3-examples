import { useState } from 'react';
import { writeContract } from '@wagmi/core';
import { useConfig } from 'wagmi';
import { Abi } from 'viem';

type Book = {
    title: string;
    year: number;
}

export default function Form(props: { address: `0x${string}`, abi: Abi }) {
    const config = useConfig();

    const [book, setBook] = useState<Book>({ title: "", year: 0 });
    const [tx, setTx] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function btnSaveClick() {
        setError(null);
        setIsLoading(true);

        try {
            const result = await writeContract(config, {
                address: props.address,
                abi: props.abi,
                functionName: 'addBook',
                args: [book],
            })

            setTx(result);
        } catch (err: any) {
            setError(err.message);
        }

        setIsLoading(false);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
            <h2>New Book</h2>
            <input
                type="text"
                placeholder="Title:"
                value={book.title}
                onChange={(e) => setBook(prevState => ({ ...prevState, title: e.target.value }))} />

            <input
                type="number"
                placeholder="Year:"
                value={book.year}
                onChange={(e) => setBook(prevState => ({ ...prevState, year: Number(e.target.value) }))} />

            <button onClick={btnSaveClick} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Book'}
            </button>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}

            {tx && (
                <div style={{ border: '1px solid #ccc', padding: 8 }}>
                    <h3>Tx Hash:</h3>
                    <pre>{tx}</pre>
                </div>
            )}
        </div>
    )
}
