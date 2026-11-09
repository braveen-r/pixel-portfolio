import React, { useState } from 'react';
import { Pause, Volume2, VolumeX, Eye, Gamepad2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { sound } from '../utils/audio';

interface FloatingGameHUDProps {
  score: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const FloatingGameHUD = ({ score, isMuted, onToggleMute }: FloatingGameHUDProps) => {
  // State to control if the panel is slid in or out
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    sound.playClick();
    setIsVisible(!isVisible);
  };

  return (
    <div 
      className={`fixed bottom-6 right-0 z-50 flex items-center transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-x-0 pr-6' : 'translate-x-[calc(100%-2.5rem)]'
      }`}
    >
      {/* 1. The Toggle Arrow Tab */}
      <button 
        onClick={handleToggle}
        className="bg-[#EFE3C8] border-y-2 border-l-2 border-[#3C2A21] w-10 h-12 flex items-center justify-center shadow-[-4px_4px_0px_rgba(60,42,33,1)] hover:bg-[#F7EFE5] transition-colors focus:outline-none z-10 cursor-pointer"
        aria-label={isVisible ? "Hide HUD" : "Show HUD"}
      >
        {isVisible ? (
          <ChevronRight className="w-6 h-6 text-[#3C2A21]" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-[#3C2A21]" />
        )}
      </button>

      {/* 2. The Main HUD Panel (Based on your snapshot) */}
      <div className="bg-[#EFE3C8] border-2 border-[#3C2A21] p-2 flex items-center gap-3 shadow-[4px_4px_0px_#3C2A21]">
        
        {/* Score Display Box */}
        <div className="bg-[#1E120B] border-2 border-[#3C2A21] px-3 py-1.5 flex items-center gap-3 h-10 min-w-[120px]">
          <div className="w-2 h-2 rounded-full bg-[#708238] animate-pulse" /> {/* Green Dot */}
          <span className="font-pixel text-[#E0A96D] text-[10px] sm:text-xs tracking-wider">SCORE:</span>
          <span className="font-pixel text-white text-[10px] sm:text-xs">{score.toString().padStart(3, '0')}</span>
        </div>

        {/* Square Action Buttons */}
        <div className="flex gap-1.5">
          <button className="w-10 h-10 flex items-center justify-center border-2 border-[#3C2A21] bg-[#F7EFE5] hover:bg-[#D0B8A8] transition-colors group cursor-not-allowed">
            <Pause className="w-4 h-4 text-[#3C2A21] group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={onToggleMute}
            className={`w-10 h-10 flex items-center justify-center border-2 border-[#3C2A21] transition-colors group cursor-pointer ${
              !isMuted ? 'bg-[#708238] text-white' : 'bg-[#F7EFE5] text-[#3C2A21] hover:bg-[#D0B8A8]'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> : <VolumeX className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          </button>

          <button className="w-10 h-10 flex items-center justify-center border-2 border-[#3C2A21] bg-[#F7EFE5] hover:bg-[#D0B8A8] transition-colors group cursor-pointer">
            <Eye className="w-4 h-4 text-[#3C2A21] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-10 h-10 flex items-center justify-center border-2 border-[#3C2A21] bg-[#F7EFE5] hover:bg-[#D0B8A8] transition-colors group cursor-pointer">
            <Gamepad2 className="w-4 h-4 text-[#3C2A21] group-hover:scale-110 transition-transform" />
          </button>

          <button className="w-10 h-10 flex items-center justify-center border-2 border-[#3C2A21] bg-[#F7EFE5] hover:bg-[#D0B8A8] transition-colors group cursor-pointer">
            <Sparkles className="w-4 h-4 text-[#3C2A21] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};