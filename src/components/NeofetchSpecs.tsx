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
    <div key={label} className="flex items-baseline gap-2 text-xs sm:text-[13px] font-mono">
      <span className="text-[#E0A96D] shrink-0">
        <span className="text-[#8B5E3C] mr-1">.</span>
        {label}:
      </span>
      <span className="flex-1 border-b border-dotted border-[#5A4332] opacity-60 hidden sm:inline-block" />
      <span className="text-[#EFE3C8] sm:text-right break-words">{value}</span>
    </div>
  );

  return (
    <section id="system-specs" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8B5E3C] text-white border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-pixel text-lg sm:text-xl text-[#1E120B] uppercase">
            SYSTEM_SPECS (NEOFETCH)
          </h2>
          <p className="font-silkscreen text-xs text-[#8B5E3C] uppercase">
            [SUNRAKU@ARCHLINUX • DAILY DRIVER &amp; ENVIRONMENT]
          </p>
        </div>
      </div>

      {/* Retro Terminal Window */}
      <div className="bg-[#110A06] border-4 border-[#3C2A21] shadow-[6px_6px_0px_#3C2A21] overflow-hidden">
        {/* Title Bar */}
        <div className="bg-[#3C2A21] px-3 py-1.5 flex items-center justify-between border-b-2 border-[#1E120B]">
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#EFE3C8] shrink-0" />
            <span className="font-pixel text-[9px] text-[#EFE3C8] tracking-wider truncate">
              kitty — sunraku@archlinux: ~ (neofetch)
            </span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 bg-[#A04747] border border-[#1E120B]" />
            <div className="w-2.5 h-2.5 bg-[#E0A96D] border border-[#1E120B]" />
            <div className="w-2.5 h-2.5 bg-[#708238] border border-[#1E120B]" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Sunraku ASCII Art + Palette */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center lg:border-r-2 lg:border-[#3C2A21] lg:pr-6 py-2 overflow-x-auto">
              <pre className="font-mono text-[4.5px] sm:text-[5.5px] xl:text-[6px] leading-[1.15] text-[#EFE3C8] select-none drop-shadow-[0_0_3px_rgba(224,169,109,0.25)]">
                {SUNRAKU_ASCII}
              </pre>

              <div className="mt-4 font-silkscreen text-xs text-[#EFE3C8] font-bold">
                <span className="text-[#708238]">sunraku</span>@<span className="text-[#E0A96D]">archlinux</span>
              </div>

              {/* Battery / Mana Bar */}
              <div className="mt-2.5 flex items-center gap-2 font-mono text-xs text-[#D0B8A8]">
                <span className="text-[#E0A96D]">Battery:</span>
                <div className="w-24 h-3 bg-[#1E120B] border border-[#8B5E3C] p-0.5">
                  <div className="h-full w-[85%] bg-[#708238]" />
                </div>
                <span className="text-[#EFE3C8]">85%</span>
              </div>

              {/* Classic Neofetch Color Blocks */}
              <div className="mt-3.5 flex items-center gap-1">
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
            <div className="lg:col-span-7 space-y-4">
              {/* Group 1: System */}
              <div className="space-y-1.5">
                <div className="font-silkscreen text-xs text-[#EFE3C8] flex items-center gap-2 pb-1">
                  <span className="text-[#708238] font-bold">sunraku@archlinux</span>
                  <span className="flex-1 border-b border-[#5A4332]" />
                </div>
                {SYSTEM_GROUP_1.map((item) => renderSpecRow(item.label, item.value))}
              </div>

              {/* Group 2: Stack & Setup */}
              <div className="space-y-1.5 pt-1">
                {SYSTEM_GROUP_2.map((item) => renderSpecRow(item.label, item.value))}
              </div>

              {/* Group 3: Live GitHub Stats */}
              <div className="space-y-1.5 pt-2">
                <div className="font-silkscreen text-xs text-[#EFE3C8] flex items-center gap-2 pb-1">
                  <span className="text-[#E0A96D] font-bold">GitHub Stats</span>
                  <span className="flex-1 border-b border-[#5A4332]" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                  <div className="bg-[#1E120B] border border-[#3C2A21] p-2 text-center">
                    <div className="text-[#8B5E3C] text-[10px]">REPOS</div>
                    <div className="font-pixel text-sm text-[#EFE3C8] mt-0.5">{ghStats.repos}</div>
                  </div>
                  <div className="bg-[#1E120B] border border-[#3C2A21] p-2 text-center">
                    <div className="text-[#8B5E3C] text-[10px]">STARS</div>
                    <div className="font-pixel text-sm text-[#E0A96D] mt-0.5">{ghStats.stars}</div>
                  </div>
                  <div className="bg-[#1E120B] border border-[#3C2A21] p-2 text-center">
                    <div className="text-[#8B5E3C] text-[10px]">FOLLOWERS</div>
                    <div className="font-pixel text-sm text-[#708238] mt-0.5">{ghStats.followers}</div>
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