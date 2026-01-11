
import React, { useEffect, useState } from 'react';
import { Twitter, Send, Users, Zap, Brain } from 'lucide-react';
import { JUPITER_URL, X_COMMUNITY_URL, VISIONARY_URL } from '../constants';
import { motion } from 'framer-motion';

export const WarriorHub: React.FC = () => {
    const [decryptedText, setDecryptedText] = useState("");
    const fullText = "FRONTLINE COMMUNICATIONS // INTEL";
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDecryptedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="warrior-hub" className="py-24 bg-deep-navy border-t border-cyan-900/20 relative overflow-hidden">
             
             {/* Background accents */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none"
             ></motion.div>

             <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                     <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl font-bold text-white mb-2"
                     >
                        WARRIOR HUB
                     </motion.h2>
                     <p className="font-mono text-neon-cyan tracking-widest text-sm min-h-[1.5em]">
                         {decryptedText}<span className="animate-pulse">_</span>
                     </p>
                </div>

                <div className="flex flex-col items-center gap-12">
                    
                    {/* Community & Links - Now Centered and focused */}
                    <div className="flex flex-col gap-8 w-full max-w-4xl">
                        
                        {/* Status Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-trench-blue to-deep-navy p-8 border-l-4 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.2)] transition-shadow duration-500 relative"
                        >
                            <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-3 justify-center md:justify-start">
                                JOIN THE RESISTANCE
                            </h3>
                            
                            <p className="font-body text-slate-400 text-lg mb-8 leading-relaxed text-center md:text-left max-w-2xl">
                                The war is fought in the trenches of X. 
                                We coordinate raids, share memes, and hold the line against the jeets.
                            </p>
                            
                            {/* Command Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <SocialLink 
                                    href={X_COMMUNITY_URL} 
                                    icon={Users} 
                                    label="X COMMUNITY" 
                                    sub="THE TRENCH" 
                                    color="bg-slate-800/50 border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white" 
                                />
                                <SocialLink 
                                    href={VISIONARY_URL} 
                                    icon={Brain} 
                                    label="VISIONARY" 
                                    sub="@TheWhiteWhaleV2" 
                                    color="bg-purple-900/20 border-purple-500 hover:bg-purple-500 hover:text-white text-purple-400" 
                                />
                                <SocialLink 
                                    href={JUPITER_URL} 
                                    icon={Zap} 
                                    label="BUY ON JUP" 
                                    sub="INITIATE SWAP" 
                                    color="bg-neon-cyan/10 border-neon-cyan hover:bg-neon-cyan hover:text-black text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.1)]" 
                                />
                            </div>

                        </motion.div>

                        {/* Operational Protocols */}
                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/40 border border-cyan-900 p-6"
                         >
                            <h4 className="font-mono text-white text-sm mb-4 border-b border-cyan-800 pb-2 text-center md:text-left">OPERATIONAL PROTOCOLS</h4>
                            <ul className="space-y-3 font-mono text-sm text-cyan-500/80 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["NEVER SELL FOR LOSS", "RAID TARGETS DAILY", "TRUST NO DEVS. TRUST CODE.", "HOLD UNTIL 2063"].map((item, i) => (
                                    <li key={i} className="flex gap-2 items-center justify-center md:justify-start">
                                        <span className="text-neon-cyan">&gt;</span>
                                        <span className="hover:text-white transition-colors cursor-default">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>
             </div>
        </section>
    );
};

// Helper Component for the Links
const SocialLink: React.FC<{ href: string, icon: React.ElementType, label: string, sub: string, color: string, className?: string }> = ({ href, icon: Icon, label, sub, color, className = "" }) => (
    <motion.a 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center gap-4 p-4 border transition-all rounded-sm group ${color} ${className}`}
    >
        <div className="p-2 rounded bg-black/20 group-hover:bg-black/10 transition-colors">
            <Icon size={24} />
        </div>
        <div className="flex flex-col text-left">
            <span className="font-display font-bold text-lg leading-none mb-1">{label}</span>
            <span className="font-mono text-[10px] opacity-70 tracking-wider uppercase">{sub}</span>
        </div>
    </motion.a>
);
