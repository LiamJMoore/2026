
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Dashboard } from './components/Dashboard';
import { WarriorHub } from './components/WarriorHub';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { DepthGauge } from './components/DepthGauge';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-abyss text-slate-200 overflow-x-hidden selection:bg-neon-cyan selection:text-black relative">
      
      {/* Global Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-hex-pattern opacity-5"></div>
        {/* Deep Sea Bioluminescence */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-hologram-pink/5 rounded-full blur-[100px]"></div>
        
        {/* Floating Particles - Enhanced with Motion */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-200/20 rounded-full"></motion.div>
        <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-3/4 left-1/3 w-2 h-2 bg-white/10 rounded-full"></motion.div>
        <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-500/30 rounded-full"></motion.div>
        
        {/* Sonar Pulse Effect - Periodic center ping */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[1px] rounded-full border border-cyan-500/10 animate-sonar"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        {/* Immersive Depth Tracker */}
        <DepthGauge />
        
        <main>
          <Hero />
          <Manifesto />
          <Dashboard />
          <WarriorHub />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
