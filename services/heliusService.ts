import { HELIUS_RPC_URL, CA } from '../constants';
import { Transaction, TokenStats, PortfolioItem } from '../types';

export const getSolanaBalance = async (address: string): Promise<number> => {
    try {
        const response = await fetch(HELIUS_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'white-whale-balance',
                method: 'getBalance',
                params: [address]
            }),
        });
        const data = await response.json();
        if (data.result && data.result.value) {
            return data.result.value / 1000000000;
        }
        return 0;
    } catch (error) {
        console.error("Failed to fetch balance:", error);
        return 0;
    }
};

export const getTreasuryTokens = async (address: string): Promise<PortfolioItem[]> => {
    try {
        const response = await fetch(HELIUS_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'get-treasury-tokens',
                method: 'getTokenAccountsByOwner',
                params: [
                    address,
                    { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
                    { encoding: 'jsonParsed' }
                ]
            }),
        });
        const data = await response.json();
        if (data.result && data.result.value) {
            return data.result.value.map((item: any) => ({
                mint: item.account.data.parsed.info.mint,
                amount: item.account.data.parsed.info.tokenAmount.uiAmount,
                decimals: item.account.data.parsed.info.tokenAmount.decimals
            })).filter((t: any) => t.amount > 0);
        }
        return [];
    } catch (error) {
        console.error("Error fetching token accounts:", error);
        return [];
    }
};

export const getRecentSignatures = async (limit: number = 10): Promise<Transaction[]> => {
    try {
        const response = await fetch(HELIUS_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'white-whale-sigs',
                method: 'getSignaturesForAddress',
                params: [
                    CA,
                    { limit: limit }
                ]
            }),
        });
        const data = await response.json();
        
        if (data.result) {
            return data.result.map((tx: any) => ({
                signature: tx.signature,
                slot: tx.slot,
                blockTime: tx.blockTime,
                status: tx.err ? 'fail' : 'success'
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch signatures:", error);
        return [];
    }
};

export const getTokenStats = async (): Promise<TokenStats | null> => {
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`);
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
            const pair = data.pairs[0];
            return {
                supply: 1000000000,
                // Updated default holder count to reflect current status > 10k
                holders: 12420, 
                price: parseFloat(pair.priceUsd),
                marketCap: pair.fdv || pair.marketCap,
                liquidity: pair.liquidity?.usd || 0
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch DexScreener data:", error);
        return null;
    }
};

export const getSolPrice = async (): Promise<number> => {
    try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112');
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
            return parseFloat(data.pairs[0].priceUsd);
        }
        return 0;
    } catch (error) {
        console.error("Failed to fetch SOL price:", error);
        return 0;
    }
};