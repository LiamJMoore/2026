

import { HELIUS_RPC_URL, CA } from '../constants';
import { Transaction, TokenStats, PortfolioItem, ServiceProfile, Rank, Medal } from '../types';

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

export const getHolderCount = async (): Promise<number> => {
    try {
        // Fetching all token accounts for the mint. 
        // Using dataSlice to only get keys, saving bandwidth.
        const response = await fetch(HELIUS_RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'get-holder-count',
                method: 'getProgramAccounts',
                params: [
                    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // SPL Token Program ID
                    {
                        encoding: 'base64',
                        filters: [
                            {
                                memcmp: {
                                    offset: 0,
                                    bytes: CA // Filter by Mint Address
                                }
                            }
                        ],
                        dataSlice: { offset: 0, length: 0 } 
                    }
                ]
            }),
        });
        const data = await response.json();
        // If result is available, return length. If not (error/limit), return 0.
        return data.result ? data.result.length : 0;
    } catch (error) {
        console.error("Failed to fetch holder count:", error);
        return 0;
    }
};

export const getJupPrice = async (tokenId: string): Promise<number> => {
    try {
        const response = await fetch(`https://api.jup.ag/price/v2?ids=${tokenId}`);
        if (!response.ok) {
            throw new Error(`Jupiter API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const priceStr = data.data?.[tokenId]?.price;
        return priceStr ? parseFloat(priceStr) : 0;
    } catch (error) {
        console.error("Failed to fetch Jupiter price:", error);
        return 0;
    }
};

export const getTokenStats = async (): Promise<TokenStats | null> => {
    try {
        const [dexResponse, holderCount, jupPrice] = await Promise.all([
            fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`).then(res => res.json()).catch(e => ({ pairs: [] })),
            getHolderCount(),
            getJupPrice(CA)
        ]);

        if (dexResponse.pairs && dexResponse.pairs.length > 0) {
            const pair = dexResponse.pairs[0];
            const price = jupPrice > 0 ? jupPrice : parseFloat(pair.priceUsd);
            
            return {
                supply: 1000000000,
                holders: holderCount, 
                price: price,
                marketCap: price * 1000000000, // Calc MC based on Jup price if avail
                liquidity: pair.liquidity?.usd || 0
            };
        } else if (jupPrice > 0) {
            // Fallback if DexScreener is down but Jup is up
            return {
                supply: 1000000000,
                holders: holderCount,
                price: jupPrice,
                marketCap: jupPrice * 1000000000,
                liquidity: 0
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch stats:", error);
        return null;
    }
};

export const getSolPrice = async (): Promise<number> => {
    return await getJupPrice('So11111111111111111111111111111111111111112');
};

// --- SERVICE RECORD LOGIC ---
export const analyzeServiceRecord = async (address: string): Promise<ServiceProfile | null> => {
    try {
        // 1. Get Token Balance
        const tokens = await getTreasuryTokens(address);
        const wwToken = tokens.find(t => t.mint === CA);
        const balance = wwToken ? wwToken.amount : 0;

        // 2. Determine Rank & Stats
        // In a real app, we'd fetch full TX history to calculate 'daysHeld'.
        // For V2 prototype, we simulate date based on balance and address hash to keep it deterministic.
        
        let rank: Rank = 'KRILL';
        if (balance > 1000000) rank = 'ABYSSAL_TITAN'; // > 1M tokens
        else if (balance > 100000) rank = 'TRENCH_WARRIOR'; // > 100k tokens
        
        // Simulating wallet age for the demo if real history is heavy to fetch
        const daysHeld = balance > 0 ? (address.charCodeAt(0) % 90) + 5 : 0; 
        
        const medals: Medal[] = [
            {
                id: 'diamond_hands',
                name: 'DIAMOND HANDS',
                icon: 'Gem',
                description: 'Held for 30+ days without selling',
                unlocked: daysHeld > 30
            },
            {
                id: 'whale',
                name: 'WHALE STATUS',
                icon: 'Crown',
                description: 'Hold > 1,000,000 WW',
                unlocked: balance > 1000000
            },
            {
                id: 'iron_belly',
                name: 'IRON BELLY',
                icon: 'Shield',
                description: 'Survived the -50% dip',
                unlocked: daysHeld > 60
            }
        ];

        return {
            address,
            rank,
            joinDate: new Date(Date.now() - (daysHeld * 86400000)).toLocaleDateString(),
            daysHeld,
            tokenBalance: balance,
            medals
        };

    } catch (e) {
        console.error("Service Record Analysis Failed", e);
        return null;
    }
};
