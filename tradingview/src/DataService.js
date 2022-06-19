import axios from 'axios';
import Candle from './Candle';

export async function getCandles(symbol = 'BTCUSDT', interval = '1m') {
    const response = await axios.get(`http://localhost:3001/klines?symbol=${symbol.toUpperCase()}&interval=${interval}`);
    const candles = response.data.map(k => {
        return new Candle(k[0], k[1], k[2], k[3], k[4])
    })
    return candles;
}