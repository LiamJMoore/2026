
import React from 'react';
import { formatCurrency } from '../../utils';
import { TokenMetrics } from '../../types';

export const CalculatorTab: React.FC<{ calcAmount: string, setCalcAmount: (v: string) => void, metrics: TokenMetrics }> = ({ calcAmount, setCalcAmount, metrics }) => {
    const amount = parseFloat(calcAmount) || 0;
    const currentVal = amount * metrics.price;
    const targets = [10, 50, 100, 1000]; // Mcap millions
    
    return (
        <div className="p-4 font-mono">
            <div className="mb-4">
                <label className="block text-cyan-700 text-xs mb-1">TOKEN AMOUNT</label>
                <input 
                    type="number" 
                    value={calcAmount} 
                    onChange={(e) => setCalcAmount(e.target.value)}
                    className="bg-black border border-cyan-800 p-2 text-cyan-400 w-full focus:border-cyan-400 outline-none"
                />
            </div>
            <div className="mb-6">
                <div className="text-xs text-slate-500">CURRENT VALUE</div>
                <div className="text-2xl text-white font-bold">{formatCurrency(currentVal)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {targets.map(mcap => {
                    const priceAtMcap = (mcap * 1000000) / metrics.supply;
                    const valAtMcap = amount * priceAtMcap;
                    const x = valAtMcap / currentVal;
                    return (
                        <div key={mcap} className="bg-cyan-950/20 p-3 border border-cyan-900/50">
                            <div className="text-[10px] text-cyan-600 mb-1">IF MCAP = ${mcap}M</div>
                            <div className="text-green-400 font-bold">{formatCurrency(valAtMcap)}</div>
                            <div className="text-[10px] text-slate-500">{x.toFixed(1)}x</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export const McDonaldsTab: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full">
            <h3 className="text-yellow-400 font-bold text-xl mb-4">MCDONALDS APPLICATION FORM</h3>
            <p className="text-slate-400 text-xs mb-6 max-w-xs">Backup plan initiated. Please enter your resume details below.</p>
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-colors animate-pulse">
                APPLY NOW
            </button>
            <p className="mt-4 text-[10px] text-slate-600">ERROR 404: WAGMI NOT FOUND</p>
        </div>
    );
};

export const AstrologyTab: React.FC = () => {
    const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const predictions = ["Moon imminent", "Rekt soon", "Crab market forever", "Wife changing money", "Dev will rug", "God candle loading"];
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
            {signs.map(sign => (
                <div key={sign} className="bg-indigo-950/20 border border-indigo-900/50 p-2 text-center">
                    <div className="text-indigo-400 font-bold text-xs mb-1">{sign}</div>
                    <div className="text-[10px] text-slate-300">
                        {predictions[Math.floor(Math.random() * predictions.length)]}
                    </div>
                </div>
            ))}
        </div>
    );
};
