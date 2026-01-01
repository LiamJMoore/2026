import React from 'react';
import { X_URL } from '../constants';
import { Twitter, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-deep-navy border-t border-cyan-900/30 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                
                <div className="flex gap-6 mb-8">
                    <a 
                        href={X_URL} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-12 h-12 bg-cyan-950 hover:bg-neon-cyan flex items-center justify-center rounded-full transition-all text-white hover:text-black hover:shadow-[0_0_15px_#00f3ff]"
                    >
                        <Twitter />
                    </a>
                </div>

                <div className="text-center font-mono text-slate-500 text-sm mb-12 max-w-2xl">
                    <p className="mb-4">
                        $WHITEWHALE is a community takeover token. Cryptocurrency investments involve high risk. 
                        This website provides transparency data via Helius API but does not constitute financial advice.
                    </p>
                    <p>© {new Date().getFullYear()} WHITE WHALE CTO. ALL RIGHTS RESERVED.</p>
                </div>

                <button 
                    onClick={scrollToTop}
                    className="flex items-center gap-2 text-neon-cyan font-bold font-display hover:text-white transition-colors"
                >
                    RETURN TO SURFACE <ArrowUp size={16} />
                </button>

            </div>
        </footer>
    );
};