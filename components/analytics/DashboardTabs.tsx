
import React from 'react';
import { ExternalLink, Diamond, Skull, Search } from 'lucide-react';
import { Holder, WhaleTx, Memo } from './AnalyticsTypes';
import { formatCompactNumber, formatCurrency, truncateAddress } from '../../utils';

export const HoldersTab: React.FC<{ holders: Holder[], price: number, supply: number, loading: boolean, onInspect: (addr: string) => void }> = ({ holders, price, supply, loading, onInspect }) => {
    if (loading) return <div className="p-4 text-cyan-500 animate-pulse font-mono">SCANNING LEDGER...</div>;
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-cyan-900/50 text-cyan-700">
                        <th className="p-2">RANK</th>
                        <th className="p-2">ADDRESS</th>
                        <th className="p-2">TAG</th>
                        <th className="p-2 text-right">AMOUNT</th>
                        <th className="p-2 text-right">VALUE</th>
                        <th className="p-2 text-center">PERCENT</th>
                    </tr>
                </thead>
                <tbody>
                    {holders.map((h) => {
                        const value = h.amount * price;
                        const percentage = supply > 0 ? (h.amount / supply) * 100 : 0;
                        
                        return (
                            <tr key={h.rank} className="border-b border-cyan-900/20 hover:bg-cyan-900/10 transition-colors">
                                <td className="p-2 font-bold text-cyan-300">#{h.rank}</td>
                                <td className="p-2 font-mono flex items-center gap-2">
                                    <span 
                                        className="cursor-pointer hover:text-white hover:underline decoration-cyan-500"
                                        onClick={() => onInspect(h.address)}
                                    >
                                        {truncateAddress(h.address)}
                                    </span>
                                    <a href={`https://solscan.io/account/${h.address}`} target="_blank" rel="noreferrer"><ExternalLink size={10} className="opacity-50 hover:opacity-100"/></a>
                                </td>
                                <td className="p-2 text-[10px]">
                                    {h.tag && <span className="bg-cyan-900/50 px-1 rounded text-cyan-200 border border-cyan-700">{h.tag}</span>}
                                </td>
                                <td className="p-2 text-right text-slate-400">{formatCompactNumber(h.amount)}</td>
                                <td className="p-2 text-right text-green-400">{formatCurrency(value)}</td>
                                <td className="p-2 text-center text-cyan-600 font-mono text-xs">
                                    {percentage.toFixed(2)}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export const WhaleWatchTab: React.FC<{ whales: WhaleTx[], loading: boolean, onInspect: (addr: string) => void }> = ({ whales, loading, onInspect }) => {
    if (loading) return <div className="p-4 text-cyan-500 animate-pulse font-mono">PINGING SONAR...</div>;
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-cyan-900/50 text-cyan-700">
                        <th className="p-2">TIME</th>
                        <th className="p-2">TYPE</th>
                        <th className="p-2">MAKER</th>
                        <th className="p-2 text-right">VALUE</th>
                        <th className="p-2">HASH</th>
                    </tr>
                </thead>
                <tbody>
                    {whales.map((tx) => (
                        <tr key={tx.id} className="border-b border-cyan-900/20 hover:bg-cyan-900/10 transition-colors">
                            <td className="p-2 text-slate-500 text-[10px]">{tx.time}</td>
                            <td className={`p-2 font-bold ${tx.type === 'buy' ? 'text-green-500' : tx.type === 'sell' ? 'text-red-500' : 'text-orange-500'}`}>
                                {tx.type.toUpperCase()}
                            </td>
                            <td className="p-2 font-mono flex items-center gap-2">
                                <span onClick={() => onInspect(tx.maker)} className="cursor-pointer hover:text-white">{truncateAddress(tx.maker)}</span>
                                {tx.label && <span className="text-[9px] bg-yellow-900/50 text-yellow-200 px-1 border border-yellow-700 rounded">{tx.label}</span>}
                            </td>
                            <td className={`p-2 text-right font-mono ${tx.value > 10000 ? 'text-yellow-400 font-bold' : 'text-slate-300'}`}>
                                {formatCurrency(tx.value)}
                            </td>
                            <td className="p-2">
                                <a href={`https://solscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-white flex items-center gap-1 text-[10px]">
                                    TX <ExternalLink size={8} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const MemoWallTab: React.FC<{ memos: Memo[], loading: boolean }> = ({ memos, loading }) => {
    if (loading) return <div className="p-4 text-cyan-500 animate-pulse font-mono">DECODING SIGNALS...</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {memos.map((m, i) => (
                <div key={i} className="bg-cyan-950/20 p-2 border border-cyan-900/50 font-mono text-xs hover:border-cyan-500 transition-colors">
                    <div className="flex justify-between text-[10px] text-cyan-700 mb-1">
                        <span>{truncateAddress(m.sender)}</span>
                        <span>{m.time}</span>
                    </div>
                    <p className="text-cyan-300">"{m.message}"</p>
                    <div className="text-[9px] text-slate-600 mt-1 truncate">SIG: {m.signature}</div>
                </div>
            ))}
        </div>
    );
};
