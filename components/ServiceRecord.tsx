
import React, { useState, useEffect } from 'react';
import { Shield, Medal, Skull, Search, LogOut, Gem, Crown, Anchor } from 'lucide-react';
import { analyzeServiceRecord } from '../services/heliusService';
import { ServiceProfile, Rank } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceRecordProps {
    onRankChange: (rank: Rank | null) => void;
}

export const ServiceRecord: React.FC<ServiceRecordProps> = ({ onRankChange }) => {
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState<ServiceProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('ww_service_record');
        if (saved) {
            setProfile(JSON.parse(saved));
        }
    }, []);

    // Effect to notify parent of rank change
    useEffect(() => {
        if (profile) {
            onRankChange(profile.rank);
            localStorage.setItem('ww_service_record', JSON.stringify(profile));
        } else {
            onRankChange(null);
        }
    }, [profile, onRankChange]);

    const handleSync = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return;
        
        setLoading(true);
        setError('');
        
        try {
            // Small delay for dramatic effect
            await new Promise(r => setTimeout(r, 1500));
            const data = await analyzeServiceRecord(address);
            
            if (data && data.tokenBalance > 0) {
                setProfile(data);
            } else {
                setError('NO $WHITEWHALE HOLDINGS DETECTED.');
                setProfile(null);
            }
        } catch (err) {
            setError('COMMUNICATION ERROR. TRY AGAIN.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setProfile(null);
        setAddress('');
        localStorage.removeItem('ww_service_record');
    };

    // Rank Styling Configuration
    const getRankStyles = (rank: Rank) => {
        switch (rank) {
            case 'ABYSSAL_TITAN':
                return {
                    text: 'text-amber-400',
                    border: 'border-amber-500',
                    bg: 'bg-amber-950/30',
                    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
                    title: 'ABYSSAL TITAN'
                };
            case 'TRENCH_WARRIOR':
                return {
                    text: 'text-cyan-400',
                    border: 'border-cyan-500',
                    bg: 'bg-cyan-950/30',
                    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
                    title: 'TRENCH WARRIOR'
                };
            default: // KRILL
                return {
                    text: 'text-slate-400',
                    border: 'border-slate-600',
                    bg: 'bg-slate-900/30',
                    glow: 'shadow-none',
                    title: 'KRILL'
                };
        }
    };

    const styles = profile ? getRankStyles(profile.rank) : getRankStyles('KRILL');

    return (
        <div className={`relative w-full overflow-hidden transition-all duration-700 ${profile ? styles.border : 'border-cyan-900'} border bg-black/60 backdrop-blur-md rounded-sm p-6 ${profile ? styles.glow : ''}`}>
            {/* Background Texture */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            {!profile ? (
                // LOGIN VIEW
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 bg-cyan-950/50 rounded-full flex items-center justify-center mb-6 border border-cyan-800 animate-pulse-slow">
                        <Shield size={32} className="text-cyan-500" />
                    </div>
                    <h3 className="font-display text-2xl text-white mb-2">SERVICE RECORD</h3>
                    <p className="font-mono text-cyan-500/60 text-sm mb-8 max-w-md">
                        ENTER WALLET ADDRESS TO SYNC RANK, MEDALS, AND CLASSIFICATION. 
                        <br/><span className="text-[10px] opacity-70">READ-ONLY // NO CONNECTION REQUIRED</span>
                    </p>

                    <form onSubmit={handleSync} className="w-full max-w-md flex flex-col gap-4 relative">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Solana Address..."
                                className="w-full bg-black/80 border border-cyan-800 p-4 pl-12 text-cyan-400 font-mono text-sm focus:border-neon-cyan outline-none transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-700" size={18} />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading || !address}
                            className={`w-full py-4 font-display font-bold tracking-widest text-black transition-all ${loading ? 'bg-slate-700 cursor-wait' : 'bg-neon-cyan hover:bg-white hover:shadow-[0_0_20px_#00f3ff]'}`}
                        >
                            {loading ? 'SCANNING LEDGER...' : 'SYNC IDENTITY'}
                        </button>
                    </form>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-2 text-red-500 font-mono text-xs bg-red-950/20 px-4 py-2 border border-red-900">
                            <Skull size={14} /> {error}
                        </motion.div>
                    )}
                </div>
            ) : (
                // PROFILE VIEW
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded bg-black flex items-center justify-center border ${styles.border}`}>
                                {profile.rank === 'ABYSSAL_TITAN' ? <Crown className={styles.text} /> : profile.rank === 'TRENCH_WARRIOR' ? <Shield className={styles.text} /> : <Anchor className={styles.text} />}
                            </div>
                            <div>
                                <div className={`font-mono text-[10px] ${styles.text} tracking-widest`}>CLASSIFICATION</div>
                                <h3 className={`font-display text-2xl font-bold text-white tracking-wider flex items-center gap-2`}>
                                    {styles.title}
                                    {profile.rank === 'ABYSSAL_TITAN' && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>}
                                </h3>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-slate-500 hover:text-white transition-colors" title="Disconnect">
                            <LogOut size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <StatBox label="BALANCE" value={`${(profile.tokenBalance / 1000).toFixed(1)}k`} sub="WW" style={styles} />
                        <StatBox label="DAYS HELD" value={profile.daysHeld.toString()} sub="DAYS" style={styles} />
                        <StatBox label="JOINED" value={profile.joinDate} style={styles} />
                        <StatBox label="MEDALS" value={profile.medals.filter(m => m.unlocked).length.toString()} style={styles} />
                    </div>

                    <div>
                        <div className="font-mono text-[10px] text-slate-500 mb-3 tracking-widest uppercase">SERVICE MEDALS</div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {profile.medals.map((medal) => (
                                <div 
                                    key={medal.id}
                                    className={`relative group min-w-[60px] h-[60px] flex items-center justify-center rounded border ${medal.unlocked ? `${styles.bg} ${styles.border}` : 'bg-slate-900/50 border-slate-800 opacity-50 grayscale'}`}
                                >
                                    {medal.icon === 'Gem' && <Gem size={24} className={medal.unlocked ? styles.text : 'text-slate-600'} />}
                                    {medal.icon === 'Crown' && <Crown size={24} className={medal.unlocked ? styles.text : 'text-slate-600'} />}
                                    {medal.icon === 'Shield' && <Shield size={24} className={medal.unlocked ? styles.text : 'text-slate-600'} />}
                                    
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-32 bg-black border border-slate-700 p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                        <div className={`text-[10px] font-bold ${medal.unlocked ? styles.text : 'text-slate-400'}`}>{medal.name}</div>
                                        <div className="text-[9px] text-slate-500">{medal.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatBox = ({ label, value, sub, style }: any) => (
    <div className={`p-3 bg-black/40 border ${style.border} rounded-sm`}>
        <div className="text-[9px] text-slate-500 font-mono mb-1">{label}</div>
        <div className={`text-lg font-display font-bold text-white`}>
            {value} <span className="text-[10px] font-mono text-slate-400">{sub}</span>
        </div>
    </div>
);
