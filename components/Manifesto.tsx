
import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { IMAGES, VISIONARY_URL } from '../constants';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = () => {
    return (
        <section id="manifesto" className="py-24 relative bg-abyss overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-900/50 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-600">LOG</span>
                    </motion.h2>
                    <p className="font-mono text-cyan-500/60 tracking-[0.3em] uppercase text-sm">Operation: Ethical Stewardship</p>
                </div>

                {/* Video Terminal */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative max-w-5xl mx-auto mb-20"
                >
                    {/* Decorative Frame */}
                    <div className="absolute -inset-1 bg-gradient-to-b from-cyan-900 to-transparent opacity-50 rounded-lg blur-sm"></div>
                    <div className="relative bg-black border border-cyan-800 rounded-lg overflow-hidden shadow-2xl">
                        
                        {/* Video Header UI */}
                        <div className="bg-cyan-950/30 border-b border-cyan-900/50 p-3 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                            </div>
                            <div className="font-mono text-[10px] text-cyan-400 tracking-widest">TRANSMISSION_ID: WHITE_WHALE_ORIGIN</div>
                        </div>

                        {/* Video Player */}
                        <div className="relative aspect-video bg-black group">
                             <video 
                                className="w-full h-full object-cover"
                                controls
                                poster={IMAGES.BANNER}
                                preload="metadata"
                            >
                                <source src="/manifesto.mp4" type="video/mp4" /> 
                                Your browser does not support the video tag.
                            </video>

                            {/* Play Overlay (Only visible if native controls aren't used or before play, simplified here) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-cyan-900/10 transition-colors">
                                {/* Decorative crosshair */}
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/10"></div>
                                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-500/10"></div>
                            </div>
                        </div>

                        {/* Transcript / Caption Area */}
                        <div className="bg-black/80 p-6 border-t border-cyan-900/50">
                             <p className="font-display text-xl md:text-2xl text-white text-center italic leading-relaxed">
                                "The White Whale doesn't belong to a person. It belongs to a movement who simply demanded something better."
                             </p>
                        </div>
                    </div>
                </motion.div>

                {/* The 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            id: "01", 
                            title: "THE TAKEOVER", 
                            text: "The developer fled. The chart bled. But the community refused to die. We executed a Community Takeover (CTO) to seize control.", 
                            color: "text-neon-cyan", 
                            border: "border-neon-cyan/30 hover:border-neon-cyan", 
                            shadow: "shadow-[0_0_20px_rgba(0,243,255,0.1)]" 
                        },
                        { 
                            id: "02", 
                            title: "ANTI-KOL DOCTRINE", 
                            text: "We reject the 'pay-to-pump' model. No paid influencers. No shadowy cabals. Our marketing is organic meme warfare.", 
                            color: "text-hologram-pink", 
                            border: "border-hologram-pink/30 hover:border-hologram-pink", 
                            shadow: "shadow-[0_0_20px_rgba(217,70,239,0.1)]" 
                        },
                        { 
                            id: "03", 
                            title: "RADICAL TRANSPARENCY", 
                            text: "The dashboard isn't just for show. It connects directly to the blockchain via Helius. You see what we see.", 
                            color: "text-green-400", 
                            border: "border-green-400/30 hover:border-green-400", 
                            shadow: "shadow-[0_0_20px_rgba(74,222,128,0.1)]" 
                        }
                    ].map((chapter, index) => (
                        <motion.div 
                            key={chapter.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`bg-deep-navy/50 backdrop-blur p-8 border ${chapter.border} rounded-sm transition-all duration-300 hover:-translate-y-2 ${chapter.shadow} group`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`font-mono text-3xl font-bold ${chapter.color} opacity-50 group-hover:opacity-100 transition-opacity`}>{chapter.id}</span>
                                <h3 className="font-display text-xl text-white">{chapter.title}</h3>
                            </div>
                            <p className="font-body text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                                {chapter.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
