import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { ChevronUp, Gamepad2 } from 'lucide-react';

interface FooterProps {
  score: number;
  highScore: number;
}

export const Footer: React.FC<FooterProps> = ({ score, highScore }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-8 border-t-4 border-[#3C2A21] bg-[#DFD3C3]/95 py-8 px-4 sm:px-6 lg:px-8 shadow-[0_-4px_0_rgba(60,42,33,1)] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div className="space-y-2">
          <div className="font-pixel text-xs sm:text-sm text-[#1E120B] flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.fullName.toUpperCase()}</span>
            <span className="text-[#8B5E3C] hidden sm:inline">•</span>
            <span className="font-silkscreen text-[10px] text-[#8B5E3C]">{PERSONAL_INFO.role.toUpperCase()}</span>
          </div>
          <p className="font-retro text-base text-[#3C2A21]">
            Forged with React, TypeScript, Tailwind CSS &amp; 8-bit Web Audio Synthesizer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 bg-[#EFE3C8] border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
            <Gamepad2 className="w-4 h-4 text-[#708238]" />
            <div className="font-pixel text-[9px] text-[#3C2A21]">
              SESSION: <strong className="text-[#A04747]">{score}</strong> | RECORD:{' '}
              <strong className="text-[#708238]">{highScore}</strong>
            </div>
          </div>

          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="pixel-btn text-[9px] flex items-center gap-1.5"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            TOP OF REALM
          </button>
        </div>
        
      </div>
      <br></br>
      <br></br>
    </footer>
  );
};