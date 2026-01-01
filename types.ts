

export interface TokenStats {
    supply: number;
    holders: number;
    price: number;
    marketCap: number;
    liquidity: number;
}

export interface TokenMetrics {
    price: number;
    marketCap: number;
    supply: number;
    ath: number;
}

export interface Transaction {
    signature: string;
    slot: number;
    blockTime: number;
    status: 'success' | 'fail';
}

export interface PortfolioItem {
    mint: string;
    amount: number;
    decimals: number;
    symbol?: string;
    valueUsd?: number;
}

export interface TreasuryPortfolio {
    solBalance: number;
    solValueUsd: number;
    tokens: PortfolioItem[];
    totalValueUsd: number;
}

export interface MarketPairData {
    address: string;
    url: string;
    dexId: string;
    priceUsd: string;
    liquidity?: {
        usd: number;
    };
    volume?: {
        h24: number;
    };
    pairLabel?: string;
}

export enum SectionId {
    HERO = 'hero',
    MANIFESTO = 'manifesto',
    DASHBOARD = 'dashboard',
    WARRIOR_HUB = 'warrior-hub',
    GALLERY = 'gallery',
}

// --- SERVICE RECORD TYPES ---
export type Rank = 'KRILL' | 'TRENCH_WARRIOR' | 'ABYSSAL_TITAN';

export interface Medal {
    id: string;
    name: string;
    icon: string; // Lucide icon name or emoji
    description: string;
    unlocked: boolean;
}

export interface ServiceProfile {
    address: string;
    rank: Rank;
    joinDate: string;
    daysHeld: number;
    tokenBalance: number;
    medals: Medal[];
}
