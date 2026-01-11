
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, IMAGES, JUPITER_URL } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            isScrolled 
                ? 'py-2' 
                : 'py-6'
        }`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
                isScrolled ? 'bg-deep-navy/80 backdrop-blur-xl border border-cyan-900/30 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.1)] mx-4' : 'bg-transparent'
            }`}>
                <div className="flex justify-between items-center h-16">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <img src={IMAGES.LOGO_SQUARE} alt="White Whale Logo" className="h-10 w-10 rounded-sm border border-cyan-800" />
                        <span className="font-display font-bold text-xl tracking-widest text-white">
                            WHITE<span className="text-neon-cyan">WHALE V2</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                className="font-mono text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase relative group"
                            >
                                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_5px_#00f3ff]"></span>
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href={JUPITER_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="relative overflow-hidden bg-cyan-950/50 border border-neon-cyan/50 text-white font-display font-bold px-6 py-2 skew-x-[-12deg] transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:bg-neon-cyan/10 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
                            <span className="block skew-x-[12deg] text-neon-cyan group-hover:text-white transition-colors">BUY TOKEN</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white hover:text-neon-cyan transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-4 right-4 bg-deep-navy/95 border border-cyan-900/50 backdrop-blur-xl rounded-lg p-6 flex flex-col gap-6 shadow-2xl z-50">
                     {NAV_LINKS.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className="font-display text-xl font-bold text-white hover:text-neon-cyan flex items-center justify-between border-b border-slate-800 pb-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                            <span className="text-xs font-mono text-cyan-600">0{NAV_LINKS.indexOf(link) + 1}</span>
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};
