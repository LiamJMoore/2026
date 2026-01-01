
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

export enum SectionId {
    HERO = 'hero',
    MANIFESTO = 'manifesto',
    DASHBOARD = 'dashboard',
    WARRIOR_HUB = 'warrior-hub',
    GALLERY = 'gallery',
}
