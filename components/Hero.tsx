
import React, { useState } from 'react';
import { CA, IMAGES, JUPITER_URL } from '../constants';
import { Copy, Check, Terminal, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(CA);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={IMAGES.BANNER} 
                    alt="Future Ocean Whale" 
                    className="w-full h-full object-cover object-center opacity-60 scale-105 animate-pulse-slow filter brightness-75 contrast-125"
                />
                
                {/* Wave Layers */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] overflow-hidden pointer-events-none z-10 opacity-60">
                     <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-slow opacity-30">
                        <svg className="w-1/2 h-full text-cyan-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                        <svg className="w-1/2 h-full text-cyan-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                     </div>
                     <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-medium opacity-40">
                        <svg className="w-1/2 h-full text-cyan-800" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V15.81C13,36.92,54.64,56.08,109,61,159.27,65.54,204.42,52.88,252,43.42c51.27-10.2,105.47-18.73,158-15.08,82,5.69,149.77,41.93,230.14,48.24,67.64,5.31,140.66-21.65,210.46-34.5C925.3,28.85,998.66,22.68,1065,30c51,5.63,99.71,20.72,135,46.72V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                        <svg className="w-1/2 h-full text-cyan-800" viewBox="0 0 1200 120" preserveAspectRatio="none">
                             <path d="M0,0V15.81C13,36.92,54.64,56.08,109,61,159.27,65.54,204.42,52.88,252,43.42c51.27-10.2,105.47-18.73,158-15.08,82,5.69,149.77,41.93,230.14,48.24,67.64,5.31,140.66-21.65,210.46-34.5C925.3,28.85,998.66,22.68,1065,30c51,5.63,99.71,20.72,135,46.72V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                     </div>
                     <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-wave-fast opacity-20">
                        <svg className="w-1/2 h-full text-neon-cyan" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                         <svg className="w-1/2 h-full text-neon-cyan" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" transform="scale(1, -1) translate(0, -100)"></path>
                        </svg>
                     </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-abyss via-deep-navy/80 to-transparent mix-blend-multiply pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-transparent to-abyss pointer-events-none"></div>
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <motion.div 
                className="relative z-20 max-w-7xl mx-auto px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Status Indicator */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8 px-6 py-2 border border-neon-cyan/30 bg-black/40 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#00f3ff]"></span>
                    <span className="text-neon-cyan font-mono text-xs tracking-[0.2em] uppercase">System Online // Ocean V2</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
                    <div className="glitch-text" data-text="THE OLD WAY">THE OLD WAY</div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyan-400 to-hologram-pink glitch-text" data-text="IS FINISHED">
                        IS FINISHED
                    </div>
                </motion.h1>

                <motion.p variants={itemVariants} className="font-body text-cyan-100/80 text-lg md:text-2xl max-w-3xl mx-auto mb-12 tracking-wide">
                    We are the <span className="text-neon-cyan font-bold border-b border-neon-cyan/50 shadow-[0_10px_20px_-10px_rgba(0,243,255,0.5)]">Trench Warriors</span>. 
                    No paid KOLs. No cabal. Just ethical stewardship and memetic resilience.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 w-full">
                    <motion.a 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,243,255,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        href={JUPITER_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative px-10 py-5 bg-neon-cyan/5 border border-neon-cyan/50 overflow-hidden rounded-sm w-full md:w-auto"
                    >
                        <div className="absolute inset-0 w-1 bg-neon-cyan/50 group-hover:w-full transition-all duration-300 opacity-20"></div>
                        <span className="relative font-display font-bold text-neon-cyan group-hover:text-white text-lg tracking-wider flex items-center justify-center gap-2">
                             INITIATE BUY <Play size={16} fill="currentColor" />
                        </span>
                    </motion.a>
                    
                    <motion.a 
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        href="https://t.me/WhiteWhaleMeme"
                        target="_blank"
                        rel="noreferrer"
                        className="px-10 py-5 border border-slate-700 bg-slate-900/50 backdrop-blur transition-all rounded-sm w-full md:w-auto flex items-center justify-center"
                    >
                        <span className="font-display font-bold text-white text-lg tracking-wider">JOIN TELEGRAM</span>
                    </motion.a>
                </motion.div>

                {/* CA Terminal */}
                <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
                    <motion.div 
                        whileHover={{ borderColor: "rgba(0,243,255,0.8)" }}
                        className="bg-black/60 backdrop-blur-md border border-cyan-900 p-1 rounded-sm relative group"
                    >
                         {/* Corner accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-700 group-hover:border-neon-cyan transition-colors"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-700 group-hover:border-neon-cyan transition-colors"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-700 group-hover:border-neon-cyan transition-colors"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-700 group-hover:border-neon-cyan transition-colors"></div>
                        
                        <div className="flex flex-row items-center justify-between gap-4 p-4 cursor-pointer" onClick={copyToClipboard}>
                            <div className="flex items-center gap-4 w-full overflow-hidden">
                                <div className="p-2 bg-cyan-950/50 rounded border border-cyan-800 group-hover:border-neon-cyan transition-colors shrink-0">
                                    <Terminal size={20} className="text-neon-cyan" />
                                </div>
                                <div className="font-mono text-sm text-cyan-200/70 truncate text-left flex-1 min-w-0">
                                    <div className="text-[10px] text-cyan-500 uppercase tracking-widest mb-1">Contract Address</div>
                                    <span className="text-white text-base group-hover:text-neon-cyan transition-colors tracking-wider shadow-neon truncate block">{CA}</span>
                                </div>
                            </div>
                            <button 
                                className="text-cyan-400 hover:text-white px-4 py-2 border border-transparent hover:border-cyan-700 rounded transition-all bg-cyan-950/30 shrink-0"
                                aria-label="Copy Contract Address"
                            >
                                {copied ? <Check className="text-green-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};
