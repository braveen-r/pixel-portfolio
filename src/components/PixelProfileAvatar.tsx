import React from 'react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | string;
}

export const PixelProfileAvatar: React.FC<AvatarProps> = ({ size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36', // Made slightly larger for the legendary frame
  }[size as string] || 'w-36 h-36';

  return (
    <div className={`${sizeClasses} mx-auto relative group perspective-1000 mt-2 mb-6`}>
      
      {/* Floating Magical Aura Glow */}
      <div className="absolute inset-[-15px] bg-[#708238] opacity-20 blur-xl rounded-full group-hover:opacity-50 group-hover:bg-[#E0A96D] transition-all duration-700 animate-pulse" />
      
      {/* Main Avatar Container */}
      <div className="w-full h-full bg-gradient-to-b from-[#1E120B] to-[#3C2A21] border-4 border-[#E0A96D] shadow-[6px_6px_0px_#1E120B] flex items-center justify-center overflow-hidden relative group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_#1E120B] transition-all duration-300">
        
        {/* SVG Pixel Art: Master Wizard & Companion */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-[90%] h-[90%] drop-shadow-2xl relative z-10"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* 1. Floating Magic Companion (Bobbing rapidly) */}
          <g className="animate-bounce" style={{ animationDuration: '2s' }}>
            <rect x="2" y="6" width="3" height="3" fill="#E0A96D" />
            <rect x="3" y="5" width="1" height="5" fill="#E0A96D" />
            <rect x="1" y="7" width="5" height="1" fill="#E0A96D" />
            <rect x="3" y="7" width="1" height="1" fill="#FFFFFF" className="animate-pulse" />
          </g>

          {/* 2. Main Character Body (Breathing slowly) */}
          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            
            {/* Wizard Hat */}
            <rect x="10" y="2" width="2" height="3" fill="#A04747" />
            <rect x="9" y="5" width="4" height="2" fill="#A04747" />
            <rect x="8" y="7" width="6" height="2" fill="#A04747" />
            <rect x="8" y="9" width="6" height="1" fill="#E0A96D" /> {/* Gold Ribbon */}
            <rect x="5" y="10" width="12" height="2" fill="#A04747" /> {/* Brim */}

            {/* Face & Hair */}
            <rect x="9" y="12" width="4" height="3" fill="#EFE3C8" />
            <rect x="8" y="12" width="1" height="4" fill="#1E120B" />
            <rect x="13" y="12" width="1" height="4" fill="#1E120B" />
            
            {/* Glowing Blinking Eyes */}
            <rect x="9" y="13" width="1" height="1" fill="#708238" className="animate-ping" style={{ animationDuration: '3s' }} />
            <rect x="12" y="13" width="1" height="1" fill="#708238" className="animate-ping" style={{ animationDuration: '3s' }} />
            
            {/* Scarf / Mask */}
            <rect x="9" y="15" width="4" height="1" fill="#8B5E3C" />

            {/* Cape */}
            <rect x="6" y="16" width="2" height="7" fill="#A04747" />
            <rect x="14" y="16" width="2" height="7" fill="#A04747" />

            {/* Inner Robes & Rune Belt */}
            <rect x="8" y="16" width="6" height="7" fill="#1E120B" />
            <rect x="10" y="17" width="2" height="1" fill="#708238" /> {/* Rune */}
            <rect x="9" y="18" width="4" height="1" fill="#E0A96D" /> {/* Belt */}
          </g>

          {/* 3. Magic Staff (Static so the character looks like they are holding it) */}
          <rect x="18" y="10" width="2" height="13" fill="#8B5E3C" />
          <rect x="17" y="7" width="4" height="4" fill="#708238" className="animate-pulse" />
          <rect x="18" y="8" width="2" height="2" fill="#FFFFFF" />
        </svg>

        {/* Retro CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.25)_2px,rgba(0,0,0,0.25)_4px)] pointer-events-none mix-blend-overlay" />
      </div>
      
      {/* Legendary Rank Badge */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1E120B] border-2 border-[#E0A96D] text-[#E0A96D] text-[10px] font-pixel px-3 py-1 shadow-[2px_2px_0px_#3C2A21] z-20 flex items-center gap-2">
        <span className="animate-pulse text-white">★</span> 
        MASTER WIZARD 
        <span className="animate-pulse text-white">★</span>
      </div>
    </div>
  );
};