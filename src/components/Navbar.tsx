import React, { useState, useEffect, useRef } from 'react';
import { GameMode } from "../types";
import { Volume2, VolumeX, TerminalSquare, User, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  score: number;
  gameMode: GameMode;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Navbar = ({ isMuted, onToggleMute, onSelectSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null); // Reference to track clicks outside

  const handleNavClick = (section: string) => {
    onSelectSection(section);
    setIsMenuOpen(false); 
  };

  // Close menu if clicking outside of the nav component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="h-[68px] w-full shrink-0 z-0"></div>

      <nav 
        ref={navRef} 
        className="fixed w-full top-0 left-0 z-50 bg-[#1E120B]/95 border-b-4 border-[#8B5E3C] backdrop-blur-sm shadow-[0_4px_0_rgba(60,42,33,1)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick('hero')}
            >
              <TerminalSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#E0A96D] group-hover:text-[#A04747] transition-colors" />
              <span className="font-pixel text-base sm:text-lg text-white group-hover:text-[#E0A96D] transition-colors tracking-widest">
                Braveen_R<span className="animate-pulse text-[#A04747]">_</span>
              </span>
            </div>

            {/* Center Navigation Links (Hidden on mobile) */}
            <div className="hidden md:flex gap-6 font-silkscreen text-[11px] lg:text-xs">
              {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button 
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className="text-[#8B5E3C] hover:text-[#E0A96D] hover:scale-110 transition-all uppercase tracking-wider"
                >
                  [{section}]
                </button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-4 font-pixel text-[9px] sm:text-[10px]">
              
              {/* Identity Plate (Hidden on mobile) */}
              <div className="hidden sm:flex items-center gap-1.5 bg-[#3C2A21] px-2.5 py-1.5 border-2 border-[#1E120B] text-[#E0A96D] shadow-[2px_2px_0px_#1E120B]">
                <User className="w-3.5 h-3.5 text-[#708238]" />
                <span>{PERSONAL_INFO.username.toUpperCase()}</span>
                <span className="text-[#8B5E3C] mx-0.5">|</span>
                <span className="text-[#DFD3C3] animate-pulse">LVL {PERSONAL_INFO.level}</span>
              </div>

              {/* Audio Toggle Button */}
              <button 
                onClick={onToggleMute}
                className="bg-[#3C2A21] hover:bg-[#8B5E3C] text-[#EFE3C8] px-2 py-1 sm:px-2.5 sm:py-1.5 border-2 border-[#1E120B] shadow-[2px_2px_0px_#1E120B] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A04747]" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#708238]" />}
                <span className="hidden sm:inline">{isMuted ? 'MUTE' : 'ON'}</span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden bg-[#3C2A21] hover:bg-[#8B5E3C] text-[#EFE3C8] p-1.5 border-2 border-[#1E120B] shadow-[2px_2px_0px_#1E120B] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center cursor-pointer"
              >
                {isMenuOpen ? <X className="w-5 h-5 text-[#A04747]" /> : <Menu className="w-5 h-5 text-[#E0A96D]" />}
              </button>

            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown Panel */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#1E120B] border-b-4 border-[#8B5E3C] shadow-[0_4px_0_rgba(60,42,33,1)] py-4 flex flex-col items-center gap-2">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => handleNavClick(section)}
                className="text-[#E0A96D] font-silkscreen text-xs uppercase tracking-widest hover:text-white hover:bg-[#3C2A21] w-[85%] py-3 border-2 border-transparent hover:border-[#8B5E3C] transition-all"
              >
                &gt; {section}
              </button>
            ))}
          </div>
        )}

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E0A96D] to-transparent opacity-40" />
      </nav>
    </>
  );
};