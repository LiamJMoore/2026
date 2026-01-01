

import { TokenMetrics, MarketPairData } from '../types';

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

export const fetchPairsData = async (addresses: string[]): Promise<MarketPairData[]> => {
    try {
        // DexScreener supports up to 30 addresses per request
        const chunked = addresses.slice(0, 30).join(',');
        const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${chunked}`);
        const data = await res.json();
        
        if (data.pairs) {
            return data.pairs.map((p: any) => ({
                address: p.pairAddress,
                url: p.url,
                dexId: p.dexId,
                priceUsd: p.priceUsd,
                liquidity: p.liquidity,
                volume: p.volume,
                pairLabel: `${p.baseToken.symbol}/${p.quoteToken.symbol}`
            }));
        }
        return [];
    } catch (e) {
        console.error("Failed to fetch pairs data", e);
        return [];
    }
};
