
import React from 'react';
import { X, User, Skull, Wallet } from 'lucide-react';
import { WalletProfile } from './AnalyticsTypes';
import { truncateAddress } from '../../utils';

export const WalletInspector: React.FC<{ profile: WalletProfile | null, onClose: () => void }> = ({ profile, onClose }) => {
    if (!profile) return null;

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-cyan-500 w-full max-w-md p-6 relative shadow-[0_0_50px_rgba(6,182,212,0.3)]" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-cyan-500 hover:text-white"><X size={20}/></button>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-black border-2 border-cyan-500 rounded flex items-center justify-center overflow-hidden">
                        {profile.nftPfp ? <img src={profile.nftPfp} alt="PFP" className="w-full h-full object-cover"/> : <User size={32} className="text-cyan-700"/>}
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg">{truncateAddress(profile.address)}</h3>
                        <div className="text-cyan-400 text-xs font-mono">{profile.archetype}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-sm">
                    <div className="bg-slate-800 p-3 rounded">
                        <div className="text-slate-500 text-[10px]">GRADE</div>
                        <div className={`text-2xl font-bold ${profile.grade.startsWith('S') || profile.grade.startsWith('A') ? 'text-green-400' : profile.grade.startsWith('F') ? 'text-red-500' : 'text-yellow-400'}`}>
                            {profile.grade}
                        </div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                        <div className="text-slate-500 text-[10px]">SOL BALANCE</div>
                        <div className="text-xl text-white font-bold">{profile.solBalance.toFixed(2)}</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                        <div className="text-slate-500 text-[10px]">TOKENS HELD</div>
                        <div className="text-xl text-white font-bold">{profile.tokenCount}</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded">
                        <div className="text-slate-500 text-[10px]">AGE</div>
                        <div className="text-white font-bold">{profile.walletAge}</div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-xs text-cyan-600 mb-2 font-bold">OTHER HOLDINGS</div>
                    <div className="flex flex-wrap gap-2">
                        {profile.topOtherTokens.length > 0 ? profile.topOtherTokens.map((t, i) => (
                            <span key={i} className="bg-cyan-950 px-2 py-1 rounded text-cyan-300 text-xs border border-cyan-900">{t}</span>
                        )) : <span className="text-slate-600 text-xs">No other major tokens found.</span>}
                    </div>
                </div>

                {profile.botProbability.includes("High") && (
                    <div className="bg-red-900/20 border border-red-500 p-2 flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse">
                        <Skull size={14}/> SUSPICIOUS ACTIVITY DETECTED
                    </div>
                )}
            </div>
        </div>
    );
};
