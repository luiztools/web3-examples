import { useConnect, useConnection, useConnectors, useDisconnect } from 'wagmi'

function Connection() {
    const connection = useConnection()
    const { connect, status, error } = useConnect()
    const connectors = useConnectors()
    const { disconnect } = useDisconnect()

    return (
        <>
            <div>
                <h2>Connection</h2>
                {
                    connection.status === 'connected'
                        ? (
                            <div>
                                <strong>Address:</strong> {JSON.stringify(connection.addresses)}
                                <button type="button" onClick={() => disconnect()}>
                                    Disconnect
                                </button>
                            </div>
                        )
                        : <div>
                            {connectors.map((connector) => (
                                <button
                                    key={connector.uid}
                                    onClick={() => connect({ connector })}
                                    type="button"
                                >
                                    {connector.name}
                                </button>
                            ))}
                        </div>
                }
                <div>{error?.message}</div>
            </div>
        </>
    )
}

export default Connection
