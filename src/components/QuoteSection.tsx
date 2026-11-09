import React from 'react';
import { Terminal } from 'lucide-react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full my-12">
      <div className="pixel-card bg-[#1E120B] p-6 sm:p-8 border-4 border-[#E0A96D] shadow-[6px_6px_0px_#3C2A21] relative overflow-hidden group">
        
        {/* Retro CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.25)_2px,rgba(0,0,0,0.25)_4px)] pointer-events-none mix-blend-overlay" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-5 bg-[#3C2A21] px-3 py-1 border border-[#8B5E3C] shadow-[2px_2px_0px_#1E120B]">
            <Terminal className="w-4 h-4 text-[#708238] animate-pulse" />
            <span className="font-pixel text-[10px] text-[#E0A96D]">SYSTEM.STATUS: [ WISDOM_OVERRIDE ]</span>
          </div>
          
          {/* The Quote - Now in glowing Amber/Gold! */}
          <p className="font-retro text-xl sm:text-2xl text-[#3C2A21] leading-relaxed mb-6 tracking-wide drop-shadow-md">
            &ldquo;ANY FOOL CAN WRITE CODE THAT A COMPUTER CAN UNDERSTAND.<br className="hidden sm:block" /> GOOD PROGRAMMERS WRITE CODE THAT HUMANS CAN UNDERSTAND.&rdquo;
          </p>
          
          {/* Author */}
          <div className="font-pixel text-[11px] text-[#A04747] flex items-center gap-3">
            <div className="w-6 h-0.5 bg-[#8B5E3C]"></div>
            MARTIN FOWLER
            <div className="w-6 h-0.5 bg-[#8B5E3C]"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
};