import React, { useState, useEffect } from 'react';
import { Terminal, Cpu } from 'lucide-react';

interface GitHubUserStats {
  repos: number | string;
  followers: number | string;
  stars: number | string;
}

const SUNRAKU_ASCII = `                            ++
                            +++
                           ++#++
                           +###+                        ++++
                         ++####+    +++++++++++++++++++++++
                        ++####++++####################+++
         ++++         +++#########################+++++
         ++###+++++++++################################+++++
          +++################################################+++++++
            ++++++################################################++
            +++############################################+++++++
            ++############################################+
          ++++#############################################++
         ++++###############################################++
      ++++###################################++######+########++
 ++++++#######################################++######+########++
++######################################+######++#####+##########++
    ++++++##############################+######+++#####+##########+++
       ++###############################+###+---++----##+###########++
      ++#######################+########+#+.++++++++++-+++####+++#####++
     ++########################+########++-++++++++++---+++###++
    ++##########################+#######+-++++++++++-----#++###++
   ++####+############+########+##+####++-++++++++-------##+++##++
 +++++++++#############+#####+#+##+####+--++++++---------##-   +++++
         +#############++####+++##+###++#-+++++----------#+-
        ++###########---+####++##++##++##--++------------##-
        ++#++######+-####+###++##++#++####+------------####+--
        ++++++#####-######++#++++#+++########----..-+########-.
       +++   +####-+########+++###+###########################-
       +      +####-##########################################-
              +#+++--########################################+.
              ++++++#---+#####################+-+###########--
               ++  +++++#++-####################+--#######..-
                     ++++++#-######################---...-
                        ++++####################-----
                       .----------------------------
                       --+++++++---------------------
                       -++---------------------------
                       -+---------------------------
                       -+---------------------------
                       -----------------------------
                       -----------------------------
                         ..--------------------
                         -----------------------
                        -------------------------
                        .-----+++----------------
                       -----+++++++---------------
                       .---+++++++++---------------
                      ------+++++++++--------------
                      ---------------+--------------
                     --------------------------------
                     --------------------------------
                    ----------------------------------
                    ----------------------------------`;

const SYSTEM_GROUP_1 = [
  { label: 'OS', value: 'Arch Linux, Windows 11, Android' },
  { label: 'Role', value: 'Cloud & DevOps Eng.' },
  { label: 'Desktop', value: 'Hyprland, Win Explorer' },
  { label: 'Shell', value: 'zsh, PowerShell' },
  { label: 'IDE', value: 'Neovim, VS Code, Cursor' },
  { label: 'Fuel', value: 'Coffee' },
  { label: 'Audio', value: 'The Life of Ram | Govind Vasantha' },
];

const SYSTEM_GROUP_2 = [
  { label: 'Lang.Core', value: 'JavaScript, Python, Bash, C' },
  { label: 'Lang.Web', value: 'HTML, Tailwind, React, Node' },
  { label: 'Lang.Real', value: 'English, Tamil, Malayalam' },
  { label: 'DevOps/DB', value: 'Docker, Actions, Vercel, DuckDB' },
  { label: 'Hardware', value: 'ASUS Vivobook (AMD Ryzen 3)' },
  { label: 'Hobbies', value: 'System Ricing, Action RPGs, Anime' },
  { label: 'Location', value: 'Bangalore (Study) | Kerala (Home)' },
];

const PALETTE_SWATCHES = [
  '#1E120B',
  '#3C2A21',
  '#8B5E3C',
  '#A04747',
  '#708238',
  '#E0A96D',
  '#DFD3C3',
  '#EFE3C8',
];

export const NeofetchSpecs: React.FC = () => {
  const [ghStats, setGhStats] = useState<GitHubUserStats>({
    repos: '...',
    followers: '...',
    stars: '...',
  });

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch('https://api.github.com/users/braveen-r').then((r) => r.json()),
      fetch('https://api.github.com/users/braveen-r/repos?per_page=100').then((r) => r.json()),
    ])
      .then(([user, repos]) => {
        if (!isMounted) return;
        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum: number, repo: { stargazers_count?: number }) => sum + (repo.stargazers_count || 0), 0)
          : 0;
        setGhStats({
          repos: user.public_repos ?? '11+',
          followers: user.followers ?? 0,
          stars: totalStars,
        });
      })
      .catch(() => {
        if (isMounted) {
          setGhStats({ repos: '11+', followers: '--', stars: '--' });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderSpecRow = (label: string, value: string) => (
    <div
      key={label}
      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 py-0.5 border-b border-[#2A1910] sm:border-none"
    >
      <span className="font-silkscreen font-bold text-[11px] text-[#E0A96D] shrink-0">
        <span className="text-[#8B5E3C] mr-1">.</span>
        {label}:
      </span>
      <span className="flex-1 border-b border-dotted border-[#6B4527]/60 hidden md:inline-block" />
      <span className="font-silkscreen text-[11px] sm:text-xs text-[#DFD3C3] sm:text-right break-words pl-3 sm:pl-0">
        {value}
      </span>
    </div>
  );

  return (
    <section id="system-specs" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8B5E3C] text-white border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21] shrink-0">
          <Cpu className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h2 className="font-pixel text-base sm:text-xl text-[#1E120B] uppercase break-words">
            SYSTEM_SPECS (NEOFETCH)
          </h2>
          <p className="font-silkscreen text-[11px] sm:text-xs text-[#8B5E3C] uppercase">
            [SUNRAKU@ARCHLINUX • DAILY DRIVER &amp; ENVIRONMENT]
          </p>
        </div>
      </div>

      {/* Retro Terminal Window */}
      <div className="bg-[#0D0704] border-4 border-[#3C2A21] shadow-[6px_6px_0px_#3C2A21] overflow-hidden">
        {/* Title Bar */}
        <div className="bg-[#2A1910] px-3 py-1.5 flex items-center justify-between gap-2 border-b-2 border-[#3C2A21]">
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
            <span className="font-pixel text-[8px] sm:text-[9px] text-[#DFD3C3] tracking-wider truncate">
              kitty — sunraku@archlinux: ~ (neofetch)
            </span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 bg-[#8B3A3A] border border-[#0D0704]" />
            <div className="w-2.5 h-2.5 bg-[#C27A2F] border border-[#0D0704]" />
            <div className="w-2.5 h-2.5 bg-[#596B26] border border-[#0D0704]" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-[#110A06] p-4 sm:p-6 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(224,169,109,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Sunraku ASCII Art + Palette */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center lg:border-r-2 lg:border-[#2A1910] lg:pr-6 py-2">
              <div className="w-full overflow-x-auto flex justify-center">
                <pre className="font-mono text-[4px] xs:text-[4.5px] sm:text-[5.5px] xl:text-[6px] leading-[1.15] text-[#DFD3C3] select-none">
                  {SUNRAKU_ASCII}
                </pre>
              </div>

              <div className="mt-4 font-silkscreen text-xs text-[#DFD3C3] font-bold text-center">
                <span className="text-[#708238]">sunraku</span>
                <span className="text-[#8B5E3C] mx-0.5">@</span>
                <span className="text-[#E0A96D]">archlinux</span>
              </div>

              {/* Battery / Mana Bar */}
              <div className="mt-2.5 flex items-center gap-2 font-silkscreen text-[10px] text-[#DFD3C3]">
                <span className="text-[#E0A96D]">Battery:</span>
                <div className="w-24 h-3 bg-[#0D0704] border border-[#6B4527] p-0.5">
                  <div className="h-full w-[85%] bg-[#708238]" />
                </div>
                <span className="text-[#DFD3C3]">85%</span>
              </div>

              {/* Classic Neofetch Color Blocks */}
              <div className="mt-3.5 flex flex-wrap justify-center items-center gap-1">
                {PALETTE_SWATCHES.map((hex) => (
                  <span
                    key={hex}
                    title={hex}
                    style={{ backgroundColor: hex }}
                    className="w-4 h-3.5 sm:w-5 sm:h-4 border border-[#3C2A21]"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Detailed Specs */}
            <div className="lg:col-span-7 space-y-4 min-w-0">
              {/* Group 1: System */}
              <div className="space-y-1">
                <div className="font-silkscreen text-xs text-[#708238] font-bold flex items-center gap-2 pb-1">
                  <span className="text-[#708238]">sunraku</span>
                  <span className="text-[#8B5E3C] mx-0.5">@</span>
                  <span className="text-[#E0A96D]">archlinux</span>
                  <span className="flex-1 border-b border-[#6B4527]/60" />
                </div>
                {SYSTEM_GROUP_1.map((item) => renderSpecRow(item.label, item.value))}
              </div>

              {/* Group 2: Stack & Setup */}
              <div className="space-y-1 pt-1">
                <div className="font-silkscreen text-xs text-[#708238] font-bold flex items-center gap-2 pb-1">
                  <span>Environment</span>
                  <span className="flex-1 border-b border-[#6B4527]/60" />
                </div>
                {SYSTEM_GROUP_2.map((item) => renderSpecRow(item.label, item.value))}
              </div>

              {/* Group 3: GitHub Stats */}
              <div className="space-y-2 pt-2">
                <div className="font-silkscreen text-xs text-[#708238] font-bold flex items-center gap-2 pb-1">
                  <span>GitHub Stats</span>
                  <span className="flex-1 border-b border-[#6B4527]/60" />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-[#0D0704] border-2 border-[#3C2A21] p-2.5 text-center">
                    <div className="font-silkscreen text-[10px] text-[#E0A96D]">REPOS</div>
                    <div className="font-pixel text-sm text-[#DFD3C3] mt-1">{ghStats.repos}</div>
                  </div>
                  <div className="bg-[#0D0704] border-2 border-[#3C2A21] p-2.5 text-center">
                    <div className="font-silkscreen text-[10px] text-[#E0A96D]">STARS</div>
                    <div className="font-pixel text-sm text-[#E0A96D] mt-1">{ghStats.stars}</div>
                  </div>
                  <div className="bg-[#0D0704] border-2 border-[#3C2A21] p-2.5 text-center">
                    <div className="font-silkscreen text-[10px] text-[#E0A96D]">FOLLOWERS</div>
                    <div className="font-pixel text-sm text-[#708238] mt-1">{ghStats.followers}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};