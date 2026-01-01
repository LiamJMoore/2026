
import { TokenMetrics } from '../types';

export const fetchTokenMarketData = async (ca: string): Promise<TokenMetrics | null> => {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ca}`);
        const data = await res.json();
        if (data.pairs && data.pairs[0]) {
            const pair = data.pairs[0];
            return {
                price: parseFloat(pair.priceUsd),
                marketCap: pair.fdv || pair.marketCap,
                supply: 1000000000, 
                ath: parseFloat(pair.priceUsd) * (1 + Math.random()) // Simulated ATH for now as simple endpoint doesn't give it
            };
        }
        return null;
    } catch (e) {
        return null;
    }
};
