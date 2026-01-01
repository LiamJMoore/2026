
export const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(val);
};

export const formatCompactNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 2 }).format(val);
};

export const truncateAddress = (addr: string) => {
    if (!addr) return '...';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
};
