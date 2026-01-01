
import React, { useEffect, useState } from 'react';
import { Twitter, Send } from 'lucide-react';
import { X_URL } from '../constants';
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
                    <div className="flex flex-col gap-8 w-full max-w-3xl">
                        
                        {/* Status Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-trench-blue to-deep-navy p-8 border-l-4 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.2)] transition-shadow duration-500"
                        >
                            <h3 className="font-display text-2xl text-white mb-4 flex items-center gap-3 justify-center md:justify-start">
                                JOIN THE RESISTANCE
                            </h3>
                            <p className="font-body text-slate-400 text-lg mb-8 leading-relaxed text-center md:text-left">
                                The war is fought in the trenches of X and Telegram. 
                                We coordinate raids, share memes, and hold the line against the jeets.
                                <br/><br/>
                                <span className="text-neon-cyan font-mono text-sm shadow-[0_0_10px_#00f3ff] animate-pulse block md:inline text-center md:text-left">STATUS: ACTIVE // DEPLOYING MEMETICS</span>
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://t.me/WhiteWhaleMeme" 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold py-4 px-6 transition-all clip-path-polygon hover:shadow-lg hover:shadow-blue-500/30 rounded-sm"
                                >
                                    <Send size={18} />
                                    TELEGRAM
                                </motion.a>
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={X_URL} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-slate-900 border border-slate-700 text-white font-mono font-bold py-4 px-6 transition-all rounded-sm"
                                >
                                    <Twitter size={18} />
                                    TWITTER
                                </motion.a>
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
                                        <span className="text-neon-cyan">></span>
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
