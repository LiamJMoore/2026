
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const DepthGauge: React.FC = () => {
    const { scrollYProgress } = useScroll();
    
    // Transform scroll progress (0-1) to Depth Meters (0m to 11,000m - Challenger Deep)
    const depth = useTransform(scrollYProgress, [0, 1], [0, 11000]);
    
    // Combine the formatting into the transform so we pass a single string MotionValue to the component
    const depthText = useTransform(depth, (latest) => `-${Math.round(latest)}m`);
    
    // Visual bar height
    const barHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="fixed right-2 top-1/2 -translate-y-1/2 h-[60vh] w-12 hidden lg:flex flex-col items-center justify-between z-50 pointer-events-none mix-blend-screen">
            {/* Top Marker */}
            <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-[1px] bg-cyan-500/50"></div>
                <span className="text-[10px] font-mono text-cyan-500/70 rotate-90 origin-center whitespace-nowrap translate-y-4">SURFACE</span>
            </div>

            {/* The Gauge Track */}
            <div className="flex-1 w-[2px] bg-cyan-900/30 relative mx-auto my-8">
                {/* The Filled Bar */}
                <motion.div 
                    style={{ height: barHeight }} 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 to-hologram-pink shadow-[0_0_10px_#00f3ff]"
                />
                
                {/* The Indicator */}
                <motion.div 
                    style={{ top: barHeight }} 
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 -mt-2 flex items-center justify-center"
                >
                    <div className="w-2 h-2 bg-white rotate-45 border border-neon-cyan shadow-[0_0_10px_white]"></div>
                    {/* Floating Depth Text next to indicator */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                         <div className="bg-black/80 border border-cyan-800 px-2 py-1 rounded backdrop-blur-md">
                            <motion.span className="text-neon-cyan font-mono text-xs font-bold whitespace-nowrap">
                                {depthText}
                            </motion.span>
                         </div>
                    </div>
                </motion.div>
                
                {/* Ticks */}
                {[25, 50, 75].map((tick) => (
                    <div key={tick} className="absolute w-2 h-[1px] bg-cyan-800 -left-1" style={{ top: `${tick}%` }}></div>
                ))}
            </div>

            {/* Bottom Marker */}
            <div className="flex flex-col items-center gap-1">
                 <span className="text-[10px] font-mono text-hologram-pink/70 rotate-90 origin-center whitespace-nowrap -translate-y-4">THE TRENCH</span>
                 <div className="w-2 h-[1px] bg-hologram-pink/50"></div>
            </div>
        </div>
    );
};
