
import React from 'react';
import { Phone, ShieldAlert, BadgeAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    bogIncoming: boolean;
    setBogIncoming: (v: boolean) => void;
    answerBog: () => void;
    bogAction: "dump" | "pump" | null;
    panicMode: boolean;
    sandwichAlert: string | null;
}

export const AnalyticsOverlays: React.FC<Props> = ({ bogIncoming, setBogIncoming, answerBog, bogAction, panicMode, sandwichAlert }) => {
    return (
        <>
            {/* Bogdanoff Call */}
            <AnimatePresence>
                {bogIncoming && (
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
                        className="absolute bottom-4 right-4 bg-black border-2 border-green-500 p-4 z-[60] shadow-[0_0_20px_#22c55e] max-w-xs"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden border border-green-500">
                                <img src="https://i.kym-cdn.com/entries/icons/original/000/022/506/bog.jpg" alt="Bogdanoff" className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <div className="text-green-500 font-bold text-sm">INCOMING CALL...</div>
                                <div className="text-[10px] text-slate-400 animate-pulse">UNKNOWN CALLER</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={answerBog} className="flex-1 bg-green-600 hover:bg-green-500 text-black font-bold text-xs py-2 flex items-center justify-center gap-1">
                                <Phone size={12}/> ANSWER
                            </button>
                            <button onClick={() => setBogIncoming(false)} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2">
                                IGNORE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bog Action Result */}
            <AnimatePresence>
                {bogAction && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[70] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-black/90 p-8 border-4 border-white text-center">
                            <h1 className={`text-6xl font-black ${bogAction === 'dump' ? 'text-red-600' : 'text-green-500'} glitch-text`} data-text={bogAction === 'dump' ? 'DUMP IT' : 'PUMP IT'}>
                                {bogAction === 'dump' ? 'DUMP IT' : 'PUMP IT'}
                            </h1>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Panic Mode */}
            {panicMode && (
                <div className="absolute inset-0 bg-red-600/20 z-[80] animate-pulse pointer-events-none flex items-center justify-center">
                    <div className="bg-red-950 p-6 border border-red-500">
                        <ShieldAlert size={64} className="text-red-500 mx-auto mb-4 animate-bounce"/>
                        <h2 className="text-red-500 font-bold text-4xl">SELLING IS FORBIDDEN</h2>
                    </div>
                </div>
            )}

            {/* Sandwich Alert */}
            <AnimatePresence>
                {sandwichAlert && (
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
                        className="absolute top-20 right-4 bg-orange-950/90 border border-orange-500 p-3 z-[60] flex items-center gap-3 max-w-sm"
                    >
                        <BadgeAlert className="text-orange-500 animate-spin" size={24} />
                        <div>
                            <div className="text-orange-500 font-bold text-xs">MEV ATTACK DETECTED</div>
                            <div className="text-[10px] text-orange-200">Victim: {sandwichAlert} got sandwiched.</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
