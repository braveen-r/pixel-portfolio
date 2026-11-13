import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import {
  Mail, Send, Terminal, Copy, Check, Github, Linkedin, MessageSquare, Twitter, Instagram
} from 'lucide-react';

interface ContactTerminalProps {
  onApplyCheatCode?: (code: string) => void;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({ onApplyCheatCode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cheatInput, setCheatInput] = useState('');
  const [cheatFeedback, setCheatFeedback] = useState<string | null>(null);

  const handleCopyEmail = () => {
    sound.playSpecialEat();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    sound.playClick();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1ad46911-8cf5-4c87-94ca-762eb65a0827", 
          subject: `New Quest Log from ${formData.name} via Portfolio`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        sound.playLevelUp();
        setSentStatus(`QUEST TRANSMISSION SUCCESSFUL! I WILL RESPOND SHORTLY.`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        sound.playGameOver();
        setSentStatus(`TRANSMISSION FAILED. PLEASE USE DIRECT EMAIL.`);
      }
    } catch (error) {
      sound.playGameOver();
      setSentStatus(`NETWORK ERROR. PLEASE USE DIRECT EMAIL.`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSentStatus(null), 6000);
    }
  };

  const handleCheatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = cheatInput.trim().toUpperCase();
    if (!code) return;

    sound.playSpecialEat();
    if (code === 'SPEED') {
      setCheatFeedback('⚡ HYPER SPEED UNLOCKED!');
    } else if (code === 'GOLD' || code === 'COIN') {
      setCheatFeedback('💰 +500 BONUS POINTS CONJURED!');
    } else if (code === 'GODMODE') {
      setCheatFeedback('🛡️ GODMODE ENGAGED: UNBREAKABLE SNAKE!');
    } else {
      setCheatFeedback(`✨ SECRET RUNIC SEAL "${code}" ACTIVATED!`);
    }

    if (onApplyCheatCode) {
      onApplyCheatCode(code);
    }
    setCheatInput('');
    setTimeout(() => setCheatFeedback(null), 4000);
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#E0A96D] text-[#1E120B] border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-pixel text-lg sm:text-xl text-[#1E120B]">
            GUILD TAVERN & TRANSMISSION
          </h2>
          <p className="font-silkscreen text-xs text-[#8B5E3C]">
            [DISPATCH QUEST CONTRACTS OR SEND MESSAGES TO {PERSONAL_INFO.name.toUpperCase()}]
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="pixel-card p-6 bg-[#DFD3C3]/95 shadow-[4px_4px_0px_#3C2A21]">
            <div className="border-b-2 border-[#8B5E3C] pb-2 mb-4 flex items-center justify-between">
              <span className="font-pixel text-xs text-[#3C2A21] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#8B5E3C]" /> QUEST BRIEF DISPATCH
              </span>
              <span className="font-silkscreen text-[10px] text-[#708238]">
                SECURE 8-BIT CIPHER
              </span>
            </div>

            {sentStatus && (
              <div className={`mb-4 p-3 border-2 border-[#3C2A21] font-pixel text-[10px] animate-pulse ${sentStatus.includes('FAILED') || sentStatus.includes('ERROR') ? 'bg-[#A04747] text-white' : 'bg-[#708238] text-white'}`}>
                {sentStatus}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block font-pixel text-[10px] text-[#3C2A21] mb-1">
                  YOUR CHARACTER / RECRUITER NAME:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Vance / Tech Guild Lead"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] text-sm text-[#1E120B] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] font-mono shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]"
                />
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-[#3C2A21] mb-1">
                  YOUR TRANSMISSION FREQUENCY (EMAIL):
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. recruiter@stellarcompany.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] text-sm text-[#1E120B] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] font-mono shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]"
                />
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-[#3C2A21] mb-1">
                  QUEST OBJECTIVE / PROJECT SCOPE:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your requirements, full-stack needs, contract opportunities, or simply say hello..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] text-sm text-[#1E120B] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] font-mono shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] resize-none"
                />
              </div>

              <button
                type="submit"
                id="submit-contact-form-btn"
                disabled={isSubmitting}
                className={`pixel-btn pixel-btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
              >
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                {isSubmitting ? 'TRANSMITTING...' : 'DISPATCH QUEST SCROLL'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="pixel-card p-6 bg-[#EFE3C8]/95 shadow-[4px_4px_0px_#3C2A21]">
            <div className="border-b-2 border-[#8B5E3C] pb-2 mb-3">
              <span className="font-pixel text-xs text-[#3C2A21]">
                DIRECT TRANSMISSION BEACONS
              </span>
            </div>

            <div className="space-y-3">
              {/* Official Email Inbox */}
              <div className="p-3 bg-[#F7EFE5] border-2 border-[#3C2A21]">
                <div className="font-pixel text-[9px] text-[#8B5E3C] mb-1">
                  OFFICIAL EMAIL INBOX:
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-[#1E120B] font-bold truncate">
                    {PERSONAL_INFO.email}
                  </span>
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="pixel-btn text-[9px] px-2 py-1 flex items-center gap-1 shrink-0"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#708238]" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              </div>

              {/* Social Links 2-Column Grid */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 bg-[#DFD3C3] hover:bg-[#D0B8A8] border-2 border-[#3C2A21] flex items-center justify-center gap-2 font-pixel text-[10px] text-[#1E120B] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#3C2A21]" />
                  GITHUB
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 bg-[#DFD3C3] hover:bg-[#D0B8A8] border-2 border-[#3C2A21] flex items-center justify-center gap-2 font-pixel text-[10px] text-[#1E120B] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#8B5E3C]" />
                  LINKEDIN
                </a>

                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 bg-[#DFD3C3] hover:bg-[#D0B8A8] border-2 border-[#3C2A21] flex items-center justify-center gap-2 font-pixel text-[10px] text-[#1E120B] transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#3C2A21]" />
                  TWITTER
                </a>

                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 bg-[#DFD3C3] hover:bg-[#D0B8A8] border-2 border-[#3C2A21] flex items-center justify-center gap-2 font-pixel text-[10px] text-[#1E120B] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#A04747]" />
                  INSTAGRAM
                </a>

                {/* Discord Full Width */}
                <a
                  href={PERSONAL_INFO.discord}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="col-span-2 p-2.5 bg-[#DFD3C3] hover:bg-[#D0B8A8] border-2 border-[#3C2A21] flex items-center justify-center gap-2 font-pixel text-[10px] text-[#1E120B] transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 fill-current text-[#708238]"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                  DISCORD
                </a>
              </div>
            </div>
          </div>

          <div className="pixel-card p-5 bg-[#1E120B] text-white shadow-[4px_4px_0px_#3C2A21]">
            <div className="flex items-center justify-between border-b border-[#3C2A21] pb-2 mb-3">
              <span className="font-pixel text-[10px] text-[#3C2A21] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#8B5E3C]" /> SECRET CHEAT CONSOLE
              </span>
              <span className="font-silkscreen text-[9px] text-[#8BA848]">
                v1.0.4
              </span>
            </div>

            <p className="font-mono text-xs text-[#3C2A21] mb-2">
              Try typing <span className="text-[#8B5E3C]">SPEED</span>, <span className="text-[#8B5E3C]">GOLD</span>, or <span className="text-[#8B5E3C]">GODMODE</span> below:
            </p>

            {cheatFeedback && (
              <div className="mb-2 p-1.5 bg-[#708238] text-white font-pixel text-[9px] text-center border border-white">
                {cheatFeedback}
              </div>
            )}

            <form onSubmit={handleCheatSubmit} className="flex gap-1.5">
              <input
                type="text"
                value={cheatInput}
                onChange={(e) => setCheatInput(e.target.value)}
                placeholder="ENTER RUNIC CODE..."
                className="flex-1 px-2 py-1 bg-[#3C2A21] border border-[#8B5E3C] text-xs font-mono text-[#E0A96D] uppercase focus:outline-none placeholder:text-[#DFD3C3]/40"
              />
              <button
                type="submit"
                id="submit-cheat-code-btn"
                className="px-2.5 py-1 bg-[#8B5E3C] hover:bg-[#A67B5B] font-pixel text-[9px] text-white border border-[#3C2A21]"
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};