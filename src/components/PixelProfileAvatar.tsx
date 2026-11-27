import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | string;
}

type WizardMode = 'MASTER WIZARD' | 'HYPRLAND MAGE' | 'CLOUD ARCHMAGE';

const WIZARD_MODES: WizardMode[] = ['MASTER WIZARD', 'HYPRLAND MAGE', 'CLOUD ARCHMAGE'];

const MODE_THEMES: Record<
  WizardMode,
  {
    aura: string;
    orbOuter: string;
    orbInner: string;
    rune: string;
    trim: string;
  }
> = {
  'MASTER WIZARD': {
    aura: 'bg-[#708238] opacity-25 group-hover:opacity-55 group-hover:bg-[#E0A96D]',
    orbOuter: '#708238',
    orbInner: '#FFFFFF',
    rune: '#708238',
    trim: '#E0A96D',
  },
  'HYPRLAND MAGE': {
    aura: 'bg-[#E0A96D] opacity-35 group-hover:opacity-65',
    orbOuter: '#E0A96D',
    orbInner: '#EFE3C8',
    rune: '#E0A96D',
    trim: '#708238',
  },
  'CLOUD ARCHMAGE': {
    aura: 'bg-[#A04747] opacity-35 group-hover:opacity-65',
    orbOuter: '#A04747',
    orbInner: '#FFFFFF',
    rune: '#EFE3C8',
    trim: '#E0A96D',
  },
};

export const PixelProfileAvatar: React.FC<AvatarProps> = ({ size = 'lg' }) => {
  const [mode, setMode] = useState<WizardMode>('MASTER WIZARD');

  const sizeClasses =
    {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-36 h-36',
    }[size as string] || 'w-36 h-36';

  const active = MODE_THEMES[mode];

  const handleCycleMode = () => {
    sound.playClick();
    const nextMode = WIZARD_MODES[(WIZARD_MODES.indexOf(mode) + 1) % WIZARD_MODES.length];
    setMode(nextMode);
  };

  return (
    <div className={`${sizeClasses} mx-auto relative group perspective-1000 mt-2 mb-6 select-none`}>
      {/* Floating Magical Aura Glow */}
      <div
        className={`absolute inset-[-15px] ${active.aura} blur-xl rounded-full transition-all duration-700 animate-pulse pointer-events-none`}
      />

      {/* Main Avatar Container */}
      <div
        onClick={handleCycleMode}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCycleMode();
          }
        }}
        title="Click to cycle Wizard Aura"
        aria-label={`${mode}. Click to switch wizard aura.`}
        className="w-full h-full bg-gradient-to-b from-[#1E120B] to-[#3C2A21] border-4 border-[#E0A96D] shadow-[6px_6px_0px_#1E120B] flex items-center justify-center overflow-hidden relative group-hover:-translate-y-2 group-hover:shadow-[10px_10px_0px_#1E120B] transition-all duration-300 cursor-pointer"
      >
        {/* Subtle Pixel Sparkles in Background */}
        <svg
          viewBox="0 0 28 28"
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <rect x="4" y="4" width="1" height="1" fill="#E0A96D" />
          <rect x="23" y="5" width="1" height="1" fill="#708238" />
          <rect x="24" y="22" width="1" height="1" fill="#E0A96D" />
          <rect x="4" y="23" width="1" height="1" fill="#DFD3C3" />
        </svg>

        {/* SVG Pixel Art: Enhanced Master Wizard & Companion */}
        <svg
          viewBox="0 0 28 28"
          className="w-[92%] h-[92%] drop-shadow-2xl relative z-10"
          style={{ shapeRendering: 'crispEdges' }}
        >
          {/* 1. Floating Magic Companion (Bobbing rapidly) */}
          <g className="animate-bounce" style={{ animationDuration: '2s' }}>
            <rect x="3" y="8" width="3" height="3" fill={active.trim} />
            <rect x="4" y="7" width="1" height="5" fill={active.trim} />
            <rect x="2" y="9" width="5" height="1" fill={active.trim} />
            <rect x="4" y="9" width="1" height="1" fill={active.orbInner} className="animate-pulse" />
          </g>

          {/* 2. Main Character Body (Breathing slowly) */}
          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            {/* Tall Pointed Wizard Hat with Swept Tip */}
            <rect x="13" y="1" width="2" height="1" fill="#A04747" />
            <rect x="14" y="2" width="2" height="1" fill="#A04747" />
            <rect x="12" y="3" width="4" height="2" fill="#A04747" />
            <rect x="11" y="5" width="5" height="2" fill="#A04747" />
            <rect x="10" y="7" width="7" height="3" fill="#A04747" />
            {/* Gold Hat Band & Buckle */}
            <rect x="10" y="10" width="7" height="1" fill={active.trim} />
            <rect x="13" y="10" width="2" height="1" fill="#1E120B" />
            {/* Wide Wizard Brim with Shadow Underside */}
            <rect x="7" y="11" width="13" height="2" fill="#A04747" />
            <rect x="8" y="13" width="11" height="1" fill="#3C2A21" />

            {/* Face & Hair */}
            <rect x="11" y="14" width="5" height="3" fill="#EFE3C8" />
            <rect x="10" y="14" width="1" height="5" fill="#1E120B" />
            <rect x="16" y="14" width="1" height="5" fill="#1E120B" />

            {/* Glowing Blinking Eyes */}
            <rect
              x="12"
              y="15"
              width="1"
              height="1"
              fill={active.rune}
              className="animate-ping"
              style={{ animationDuration: '3s' }}
            />
            <rect
              x="14"
              y="15"
              width="1"
              height="1"
              fill={active.rune}
              className="animate-ping"
              style={{ animationDuration: '3s' }}
            />

            {/* Scarf / Mask */}
            <rect x="10" y="17" width="7" height="1" fill="#8B5E3C" />
            <rect x="15" y="18" width="2" height="2" fill="#8B5E3C" />

            {/* Cape */}
            <rect x="8" y="18" width="2" height="8" fill="#A04747" />
            <rect x="17" y="18" width="2" height="8" fill="#A04747" />

            {/* Inner Robes, Tiling Sigil & Rune Belt */}
            <rect x="10" y="18" width="7" height="8" fill="#1E120B" />
            <rect x="12" y="19" width="3" height="2" fill={active.rune} />
            <rect x="13" y="19" width="1" height="2" fill="#1E120B" />
            <rect x="10" y="22" width="7" height="1" fill={active.trim} />
          </g>

          {/* 3. Magic Staff (Static so the character looks like they are holding it) */}
          <rect x="21" y="11" width="2" height="15" fill="#8B5E3C" />
          <rect x="20" y="8" width="4" height="4" fill={active.orbOuter} className="animate-pulse" />
          <rect x="21" y="9" width="2" height="2" fill={active.orbInner} />
        </svg>

        {/* Retro CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.25)_2px,rgba(0,0,0,0.25)_4px)] pointer-events-none mix-blend-overlay" />
      </div>

      {/* Legendary Rank Badge */}
      <button
        type="button"
        onClick={handleCycleMode}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1E120B] border-2 border-[#E0A96D] text-[#E0A96D] hover:bg-[#3C2A21] text-[10px] font-pixel px-3 py-1 shadow-[2px_2px_0px_#3C2A21] z-20 flex items-center gap-2 cursor-pointer transition-colors"
      >
        <span className="animate-pulse text-white">★</span>
        <span>{mode}</span>
        <span className="animate-pulse text-white">★</span>
      </button>
    </div>
  );
};