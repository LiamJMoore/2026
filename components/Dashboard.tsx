
import React, { useEffect, useState, useRef } from 'react';
import { getSolanaBalance, getTokenStats, getSolPrice, getTreasuryTokens } from '../services/heliusService';
import { TREASURY_WALLET, DEX_URL, CA } from '../constants';
import { TokenStats, TreasuryPortfolio } from '../types';
import { Activity, Shield, ExternalLink, Copy, Check, Wallet, Radar, Crosshair, Trophy, Zap, PlayCircle, RotateCcw } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { TokenAnalytics } from './TokenAnalytics';

// Mock chart data for visuals
const PRICE_DATA = [
  { name: '10:00', val: 40 },
  { name: '11:00', val: 35 },
  { name: '12:00', val: 55 },
  { name: '13:00', val: 70 },
  { name: '14:00', val: 65 },
  { name: '15:00', val: 85 },
  { name: '16:00', val: 100 },
];

const COLORS = ['#00f3ff', '#0099ff', '#1e293b']; // Cyan, Blue, Slate

// --- MINI GAME COMPONENT ---
const JeetDestroyerGame: React.FC = () => {
    const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [targets, setTargets] = useState<{id: number, x: number, y: number, type: 'jeet' | 'alpha'}[]>([]);
    
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);
    const spawnerRef = useRef<number | null>(null);

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        setTimeLeft(15);
        setTargets([]);
        
        // Timer Logic
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Spawner Logic
        spawnerRef.current = window.setInterval(() => {
            spawnTarget();
        }, 600);
    };

    const endGame = () => {
        setGameState('GAMEOVER');
        if (timerRef.current) clearInterval(timerRef.current);
        if (spawnerRef.current) clearInterval(spawnerRef.current);
    };

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (spawnerRef.current) clearInterval(spawnerRef.current);
        };
    }, []);

    const spawnTarget = () => {
        if (!gameAreaRef.current) return;
        const width = gameAreaRef.current.offsetWidth;
        const height = gameAreaRef.current.offsetHeight;
        
        // Keep away from edges
        const padding = 40;
        const x = Math.random() * (width - padding * 2) + padding;
        const y = Math.random() * (height - padding * 2) + padding;

        const newTarget = {
            id: Date.now() + Math.random(),
            x,
            y,
            type: Math.random() > 0.9 ? 'alpha' : 'jeet' // 10% chance for bonus
        } as const;

        setTargets(prev => [...prev, newTarget]);

        // Auto remove target after a short time
        setTimeout(() => {
            setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, 1500);
    };

    const handleHit = (id: number, type: string) => {
        const points = type === 'alpha' ? 500 : 100;
        setScore(prev => prev + points);
        setTargets(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="flex flex-col h-full w-full relative overflow-hidden bg-black/60 rounded-sm select-none" ref={gameAreaRef}>
             {/* Radar Background */}
             <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,243,255,0.1)_100%)]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-cyan-900 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-cyan-900 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-cyan-900 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-cyan-900/50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-cyan-900/50"></div>
                
                {/* Rotating Scanner */}
                {gameState === 'PLAYING' && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(0,243,255,0.1)_180deg)] animate-[spin_4s_linear_infinite] rounded-full origin-center"></div>
                )}
             </div>

             {/* UI Header */}
             <div className="relative z-20 flex justify-between items-center p-4 border-b border-cyan-900/50 bg-cyan-950/20 backdrop-blur-sm">
                 <div className="flex items-center gap-2">
                     <Trophy size={16} className="text-yellow-400" />
                     <span className="font-mono text-yellow-400 text-sm">HI: {highScore}</span>
                 </div>
                 <div className="font-display font-bold text-xl text-white tracking-widest text-shadow-glow">
                     {score.toString().padStart(6, '0')}
                 </div>
                 <div className={`font-mono text-sm ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                     T-{timeLeft}s
                 </div>
             </div>

             {/* Game Area & Screens */}
             <div className="flex-1 relative z-10">
                 
                 {/* IDLE SCREEN */}
                 {gameState === 'IDLE' && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-30">
                         <Radar size={48} className="text-neon-cyan mb-4 animate-pulse" />
                         <h3 className="font-display text-2xl text-white mb-2 text-center">TRAINING SIMULATION</h3>
                         <p className="font-mono text-cyan-400/70 text-xs mb-6 text-center max-w-[200px]">DESTROY JEETS (RED) <br/> PROTECT ALPHA (GOLD)</p>
                         <button 
                            onClick={startGame}
                            className="group flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all rounded-sm font-bold font-display tracking-wider"
                         >
                             <PlayCircle size={20} /> INITIATE
                         </button>
                     </div>
                 )}

                 {/* GAMEOVER SCREEN */}
                 {gameState === 'GAMEOVER' && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30">
                         <h3 className="font-display text-3xl text-white mb-2 glitch-text" data-text="SIMULATION END">SIMULATION END</h3>
                         <div className="flex flex-col items-center gap-1 mb-6">
                             <span className="font-mono text-cyan-500 text-sm">FINAL SCORE</span>
                             <span className="font-display text-4xl text-neon-cyan">{score}</span>
                         </div>
                         <button 
                            onClick={startGame}
                            className="flex items-center gap-2 px-6 py-2 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-sm font-mono text-sm"
                         >
                             <RotateCcw size={16} /> RESTART SYSTEM
                         </button>
                     </div>
                 )}

                 {/* ACTIVE TARGETS */}
                 <AnimatePresence>
                    {targets.map(target => (
                        <motion.button
                            key={target.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ left: target.x, top: target.y }}
                            className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center rounded-full border-2 cursor-pointer z-20 group ${
                                target.type === 'alpha' 
                                    ? 'border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.5)]' 
                                    : 'border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                            }`}
                            onMouseDown={() => handleHit(target.id, target.type)}
                        >
                            <div className={`w-2 h-2 rounded-full ${target.type === 'alpha' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                            <div className="absolute inset-0 rounded-full border border-current opacity-50 animate-ping"></div>
                            {/* Crosshair on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Crosshair size={24} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </motion.button>
                    ))}
                 </AnimatePresence>
             </div>
        </div>
    );
};


export const Dashboard: React.FC = () => {
    const [portfolio, setPortfolio] = useState<TreasuryPortfolio>({ solBalance: 0, solValueUsd: 0, tokens: [], totalValueUsd: 0 });
    const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sPrice, tStats] = await Promise.all([getSolPrice(), getTokenStats()]);
                setTokenStats(tStats);

                const [balance, tokens] = await Promise.all([
                    getSolanaBalance(TREASURY_WALLET),
                    getTreasuryTokens(TREASURY_WALLET)
                ]);

                const solValue = balance * sPrice;
                const mappedTokens = tokens.map(t => {
                    if (t.mint === CA && tStats) {
                        return { ...t, symbol: '$WHITEWHALE', valueUsd: t.amount * tStats.price };
                    }
                    return { ...t, valueUsd: 0 };
                });

                const tokenValue = mappedTokens.reduce((acc, curr) => acc + (curr.valueUsd || 0), 0);
                const totalValue = solValue + tokenValue;

                setPortfolio({
                    solBalance: balance,
                    solValueUsd: solValue,
                    tokens: mappedTokens,
                    totalValueUsd: totalValue
                });
                
            } catch (e) {
                console.error("Dashboard data fetch error", e);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000); 
        return () => clearInterval(interval);
    }, []);

    const copyTreasury = () => {
        navigator.clipboard.writeText(TREASURY_WALLET);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatCurrency = (val?: number) => val === undefined ? '---' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    const formatCompact = (val?: number) => val === undefined ? '---' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: "compact", maximumFractionDigits: 1 }).format(val);
    const formatPrice = (val?: number) => !val ? '---' : `$${val.toFixed(6)}`;

    // Prepare Pie Data
    const pieData = [
        { name: 'SOL', value: portfolio.solValueUsd },
        { name: '$WW', value: portfolio.tokens.find(t => t.mint === CA)?.valueUsd || 0 },
        { name: 'Other', value: 100 } 
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="dashboard" className="py-24 bg-deep-navy relative border-t border-cyan-900/30">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

             <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-cyan-900/50 pb-4">
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-4xl md:text-5xl font-bold text-white mb-2"
                        >
                            TRANSPARENCY <span className="text-neon-cyan">ENGINE</span>
                        </motion.h2>
                        <p className="font-mono text-cyan-400/60 tracking-wider">REAL-TIME ON-CHAIN INTEL // HELIUS RPC LINKED</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-neon-cyan font-mono text-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
                        </span>
                        LIVE DATA STREAM
                    </div>
                </div>

                {/* Token Analytics Component */}
                <div className="mb-12">
                    <TokenAnalytics ca={CA} />
                </div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    transition={{ staggerChildren: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    
                    {/* 1. TREASURY HUD */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-black/40 backdrop-blur border border-cyan-800 p-1 relative group overflow-hidden hover:border-neon-cyan transition-colors duration-500">
                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,243,255,0.1)_50%)] bg-[length:100%_4px]"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/50 animate-scan"></div>
                        
                        <div className="p-6 h-full flex flex-col relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-xl text-white flex items-center gap-2">
                                    <Shield className="text-neon-cyan" size={20} />
                                    VAULT STATUS
                                </h3>
                                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-800 px-2 py-1 rounded">SECURE</span>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center mb-6">
                                <div className="relative w-48 h-48 hover:scale-105 transition-transform duration-500">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Center Text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-cyan-400 text-xs font-mono">TOTAL VALUE</span>
                                        <span className="text-white font-display font-bold text-lg">{formatCompact(portfolio.totalValueUsd)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 font-mono text-sm border-t border-cyan-900 pt-4">
                                <div className="flex justify-between text-slate-300">
                                    <span>SOL HOLDINGS</span>
                                    <span className="text-white">{portfolio.solBalance.toFixed(2)} SOL</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>$WW HOLDINGS</span>
                                    <span className="text-white text-neon-cyan">{(portfolio.tokens.find(t=>t.mint===CA)?.amount || 0 / 1000000).toLocaleString()} WW</span>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="mt-4 bg-cyan-950/30 p-2 rounded border border-cyan-900 flex items-center justify-between cursor-pointer hover:border-neon-cyan transition-colors group/addr" onClick={copyTreasury}>
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <Wallet size={12} className="text-cyan-500" />
                                    <span className="font-mono text-xs text-cyan-500 truncate group-hover/addr:text-cyan-200 transition-colors">{TREASURY_WALLET}</span>
                                </div>
                                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-cyan-500" />}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. METRICS HUD */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-black/40 backdrop-blur border border-cyan-800 p-6 flex flex-col relative group hover:border-neon-cyan transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                             <Activity size={100} className="text-cyan-900/50" strokeWidth={1} />
                        </div>
                        
                        <h3 className="font-display text-xl text-white mb-8 flex items-center gap-2 relative z-10">
                            <Radar className="text-hologram-pink" size={20} />
                            MARKET INTEL
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                            {[
                                { label: "MARKET CAP", val: formatCurrency(tokenStats?.marketCap), border: "border-hologram-pink" },
                                { label: "HOLDERS", val: tokenStats?.holders ? tokenStats.holders.toLocaleString() : '10,000+', border: "border-slate-600" },
                                { label: "LIQUIDITY", val: formatCurrency(tokenStats?.liquidity), border: "border-neon-cyan" },
                                { label: "PRICE", val: formatPrice(tokenStats?.price), border: "border-white" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className={`bg-cyan-950/30 p-3 border-l-2 ${item.border}`}
                                >
                                    <p className="text-[10px] font-mono text-cyan-400 mb-1">{item.label}</p>
                                    <p className="text-white font-display text-lg">{item.val}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex-1 min-h-[150px] relative z-10">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PRICE_DATA}>
                                    <Bar dataKey="val" fill="#00f3ff" radius={[2, 2, 0, 0]} animationDuration={1500} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#020617', borderColor: '#0099ff', borderRadius: '4px' }}
                                        itemStyle={{ color: '#00f3ff', fontFamily: 'Share Tech Mono' }}
                                        cursor={{fill: 'rgba(0, 243, 255, 0.05)'}}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <a href={DEX_URL} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-cyan-500 hover:text-white transition-colors">
                            FULL CHART ANALYSIS <ExternalLink size={12} />
                        </a>
                    </motion.div>

                    {/* 3. WAR GAMES HUD (Replaces Trench Feed) */}
                    <motion.div variants={cardVariants} className="col-span-1 bg-black/40 backdrop-blur border border-cyan-800 p-0 flex flex-col h-[500px] lg:h-auto relative hover:border-neon-cyan transition-colors duration-500 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                         <div className="absolute top-0 right-0 p-2 z-10">
                            <Zap className="text-yellow-400 animate-pulse" size={16} />
                         </div>
                         <h3 className="font-display text-xl text-white p-6 pb-2 flex items-center gap-2 relative z-10 pointer-events-none">
                            <Crosshair className="text-red-500" size={20} />
                            JEET DESTROYER
                        </h3>
                        <p className="px-6 text-xs font-mono text-cyan-600 mb-4 pointer-events-none">TACTICAL SIMULATION // CLICK TARGETS</p>
                        
                        <div className="flex-1 w-full relative">
                            <JeetDestroyerGame />
                        </div>
                    </motion.div>

                </motion.div>
             </div>
        </section>
    );
};
