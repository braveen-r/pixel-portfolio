import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { GameMode } from '../types';
import { PixelProfileAvatar } from './PixelProfileAvatar';
import {
  Gamepad2,
  Sword,
  Sparkles,
  Mail,
  Heart,
  Zap,
  Terminal,
  MapPin,
  Flame,
} from 'lucide-react';

const useTypingText = (words: string[], typingSpeed = 100, deletingSpeed = 60, delayBeforeDelete = 1500) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingDelay(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingDelay(500); 
      }
    };

    timer = setTimeout(handleTyping, typingDelay);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, words, typingSpeed, deletingSpeed, delayBeforeDelete]);

  return text;
};

const TITLES = [
  "FRONTEND DEVELOPER", 
  "SYSTEM RICER", 
  "CLOUD AUTOMATOR",
  "BCA STUDENT",
  "LINUX ENTHUSIAST",
  "OPEN SOURCE CONTRIBUTOR"
];

interface HeroProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ gameMode, onModeChange, onNavigate }) => {
  const [dialogText, setDialogText] = useState('');
  
  const typingText = useTypingText(TITLES);
  const fullText = `Greetings! I'm ${PERSONAL_INFO.fullName} — a Frontend Developer & Cloud Automator. I build fast, interactive web applications and heavily customized system environments.`;

  useEffect(() => {
    let index = 0;
    setDialogText('');
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDialogText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [fullText]);

  const handleTakeControl = () => {
    sound.playClick();
    onModeChange('manual');
  };

  return (
    <section id="hero" className="relative pt-6 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top RPG Player Stat HUD Ribbon */}
      <div className="pixel-card-subtle mb-6 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 font-silkscreen text-[#3C2A21]">
            <Sparkles className="w-3.5 h-3.5 text-[#A67B5B]" />
            <span>CLASS: <strong>{PERSONAL_INFO.class}</strong> (LVL {PERSONAL_INFO.level})</span>
          </div>

          <div className="flex items-center gap-1.5 font-silkscreen text-[#3C2A21]">
            <Heart className="w-3.5 h-3.5 text-[#A04747] fill-current" />
            <span>HP:</span>
            <div className="w-20 sm:w-28 h-3 bg-[#3C2A21] border border-[#1E120B] p-0.5">
              <div className="h-full bg-[#A04747] w-full" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-silkscreen text-[#3C2A21]">
            <Zap className="w-3.5 h-3.5 text-[#708238] fill-current" />
            <span>MP:</span>
            <div className="w-20 sm:w-28 h-3 bg-[#3C2A21] border border-[#1E120B] p-0.5">
              <div className="h-full bg-[#708238] w-full" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-silkscreen text-[11px] text-[#8B5E3C]">
          <MapPin className="w-3.5 h-3.5 text-[#8B5E3C]" />
          <span>{PERSONAL_INFO.location}</span>
        </div>
      </div>

      {/* Hero Main Translucent Card */}
      <div className="pixel-card p-6 sm:p-8 md:p-10 shadow-[6px_6px_0px_#3C2A21]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pixel Avatar & Profile Controls */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <PixelProfileAvatar size="lg" />
            </div>

            <div className="font-silkscreen text-[10px] text-[#3C2A21] mb-3 flex items-center justify-center gap-1.5 px-3 py-1 bg-[#EFE3C8]/90 border-2 border-[#8B5E3C]">
              <span className="w-2 h-2 rounded-full bg-[#708238] animate-ping" />
              <span>ACTIVELY SEEKING INTERNSHIPS</span>
            </div>

            <button
              id="hero-play-snake-btn"
              onClick={handleTakeControl}
              className="pixel-btn pixel-btn-green w-full max-w-xs text-[10px] flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              {gameMode === 'manual' ? 'SNAKE ACTIVE [WASD]' : 'TAKE CONTROL OF SNAKE'}
            </button>
          </div>

          {/* Right Column: Title, Dialogue, Tech Stack & CTAs */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Role & Headline */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE3C8]/90 border-2 border-[#8B5E3C] font-silkscreen text-[11px] text-[#8B5E3C] mb-2">
                <Flame className="w-3.5 h-3.5 text-[#A04747]" />
                {PERSONAL_INFO.headline}
              </div>

              <h1 className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-[#1E120B] leading-snug tracking-tight mb-3">
                HI, I'M <span className="text-[#A67B5B]">{PERSONAL_INFO.name.toUpperCase()}</span>
              </h1>

              {/* UPGRADED CREATIVE: Fixed-height Mini Linux Terminal Window */}
              <div className="w-full max-w-md bg-[#110A06] border-2 border-[#3C2A21] mb-4 shadow-[4px_4px_0px_#3C2A21] overflow-hidden group">
                
                {/* Window Title Bar */}
                <div className="bg-[#3C2A21] px-2 py-1 flex items-center justify-between border-b-2 border-[#1E120B]">
                  <div className="flex items-center gap-1.5 opacity-80">
                    <Terminal className="w-3 h-3 text-[#EFE3C8]" />
                    <span className="font-pixel text-[8px] text-[#EFE3C8] tracking-wider mt-0.5">tty1 - braveen@arch</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#A04747] border border-[#1E120B]"></div>
                    <div className="w-2 h-2 bg-[#E0A96D] border border-[#1E120B]"></div>
                    <div className="w-2 h-2 bg-[#708238] border border-[#1E120B]"></div>
                  </div>
                </div>

                {/* Terminal Body with Anti-Bounce Lock */}
                <div className="px-3 relative h-[40px] flex items-center">
                  {/* Subtle CRT Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                  
                  {/* Forced single line with whitespace-nowrap and overflow-hidden */}
                  <p className="font-silkscreen text-xs sm:text-sm font-semibold flex items-center w-full whitespace-nowrap overflow-hidden z-10 relative">
                    <span className="text-[#708238] mr-1 shrink-0">root@braveen</span>
                    <span className="text-[#EFE3C8] mr-1 opacity-70 shrink-0">:</span>
                    <span className="text-[#4A90E2] mr-2 shrink-0">~#</span>
                    <span className="text-[#E0A96D] drop-shadow-[0_0_2px_rgba(224,169,109,0.8)]">{typingText}</span>
                    <span className="inline-block w-2.5 h-[14px] bg-[#A04747] ml-1 animate-pixel-blink shadow-[0_0_5px_#A04747] shrink-0" />
                  </p>
                </div>
              </div>
            </div>

            {/* 8-Bit RPG Dialogue Box */}
            <div className="relative bg-[#F7EFE5]/85 border-3 border-[#3C2A21] p-4 shadow-[4px_4px_0px_#3C2A21]">
              <div className="absolute -top-3 left-4 bg-[#8B5E3C] text-white px-2 py-0.5 font-pixel text-[9px] border border-[#3C2A21]">
                MESSAGE FROM {PERSONAL_INFO.name.toUpperCase()}
              </div>
              <p className="font-retro text-xl sm:text-2xl text-[#3C2A21] leading-relaxed min-h-[60px] select-text">
                &ldquo;{dialogText}&rdquo;
                <span className="inline-block w-2.5 h-4 bg-[#3C2A21] ml-1 animate-pixel-blink" />
              </p>
            </div>

            {/* Core Tech Stack Pills */}
            <div className="space-y-1.5 pt-2">
              <div className="font-pixel text-[10px] text-[#8B5E3C]">
                CORE WEAPONS &amp; FRAMEWORKS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PERSONAL_INFO.coreTechnologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-[#EFE3C8]/90 border border-[#8B5E3C] font-silkscreen text-[10px] text-[#1E120B] font-bold shadow-[1px_1px_0px_#3C2A21]"
                  >
                    ★ {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stat Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2 bg-[#EFE3C8]/85 border-2 border-[#8B5E3C] text-center">
                <div className="font-pixel text-base text-[#A04747]">{PERSONAL_INFO.experienceYears} YR</div>
                <div className="font-silkscreen text-[9px] text-[#3C2A21]">DEV EXP</div>
              </div>
              <div className="p-2 bg-[#EFE3C8]/85 border-2 border-[#8B5E3C] text-center">
                <div className="font-pixel text-base text-[#708238]">11+</div>
                <div className="font-silkscreen text-[9px] text-[#3C2A21]">ACTIVE REPOS</div>
              </div>
              <div className="p-2 bg-[#EFE3C8]/85 border-2 border-[#8B5E3C] text-center">
                <div className="font-pixel text-base text-[#E0A96D]">100%</div>
                <div className="font-silkscreen text-[9px] text-[#3C2A21]">SYSTEM RICING</div>
              </div>
              <div className="p-2 bg-[#EFE3C8]/85 border-2 border-[#8B5E3C] text-center">
                <div className="font-pixel text-base text-[#8B5E3C]">BLAZING</div>
                <div className="font-silkscreen text-[9px] text-[#3C2A21]">ARCH LINUX ENV</div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-view-quests-btn"
                onClick={() => {
                  sound.playClick();
                  onNavigate('projects');
                }}
                className="pixel-btn pixel-btn-primary flex items-center gap-2"
              >
                <Sword className="w-4 h-4" />
                EXPLORE MY PROJECTS
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => {
                  sound.playClick();
                  onNavigate('contact');
                }}
                className="pixel-btn pixel-btn-gold flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                LET'S WORK TOGETHER
              </button>

              <button
                id="hero-view-skills-btn"
                onClick={() => {
                  sound.playClick();
                  onNavigate('skills');
                }}
                className="pixel-btn flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                SKILLS &amp; ARSENAL
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};