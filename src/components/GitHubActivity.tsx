import React, { useState, useEffect, useMemo } from 'react';
import { GitBranch, ExternalLink, Flame, Trophy, Calendar, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const GITHUB_USERNAME = 'braveen-r';
const YEAR_OPTIONS = ['last', '2026', '2025'] as const;
type YearOption = (typeof YEAR_OPTIONS)[number];

// Theme-matched Pixel RPG intensity palette
const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#DFD3C3] border-[#C4B49E]',
  1: 'bg-[#B7C48B] border-[#8FA05B]',
  2: 'bg-[#8FA352] border-[#708238]',
  3: 'bg-[#708238] border-[#596B26]',
  4: 'bg-[#46571B] border-[#1E120B]',
};

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const GitHubActivity: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<YearOption>('last');
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${selectedYear}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub data');
        return res.json();
      })
      .then((data: ApiResponse) => {
        if (isMounted) {
          setDays(data.contributions || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Group days into 7-day columns (Sunday -> Saturday) & compute month header positions
  const { weeks, monthLabels, stats } = useMemo(() => {
    if (!days.length) {
      return {
        weeks: [] as (ContributionDay | null)[][],
        monthLabels: [] as { label: string; colIndex: number }[],
        stats: { total: 0, activeDays: 0, longestStreak: 0, currentStreak: 0 },
      };
    }

    const padded: (ContributionDay | null)[] = [];
    const firstDate = new Date(days[0].date + 'T00:00:00');
    const startOffset = firstDate.getDay(); // 0 = Sun, 6 = Sat

    for (let i = 0; i < startOffset; i++) {
      padded.push(null);
    }
    padded.push(...days);

    const weekCols: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weekCols.push(padded.slice(i, i + 7));
    }

    // Place month labels cleanly without overlapping
    const labels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;
    weekCols.forEach((week, colIndex) => {
      const firstValidDay = week.find((d) => d !== null);
      if (firstValidDay) {
        const month = new Date(firstValidDay.date + 'T00:00:00').getMonth();
        if (month !== lastMonth) {
          if (labels.length === 0 || colIndex - labels[labels.length - 1].colIndex >= 3) {
            labels.push({ label: MONTH_NAMES[month], colIndex });
          }
          lastMonth = month;
        }
      }
    });

    // Calculate RPG stats
    let total = 0;
    let activeDays = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (const day of days) {
      total += day.count;
      if (day.count > 0) {
        activeDays++;
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    // Current streak (walk backwards from today/latest day)
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) {
        currentStreak++;
      } else if (i === days.length - 1) {
        // Allow today to still be 0 without breaking yesterday's streak
        continue;
      } else {
        break;
      }
    }

    return {
      weeks: weekCols,
      monthLabels: labels,
      stats: { total, activeDays, longestStreak, currentStreak },
    };
  }, [days]);

  const handleYearChange = (year: YearOption) => {
    sound.playClick();
    setSelectedYear(year);
  };

  return (
    <section id="github-activity" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8B5E3C] text-white border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-pixel text-lg sm:text-xl text-[#1E120B] uppercase">
              COMMIT_LOG (GITHUB ACTIVITY)
            </h2>
            <p className="font-silkscreen text-xs text-[#8B5E3C] uppercase">
              [LIVE CONTRIBUTION HEATMAP • @{GITHUB_USERNAME.toUpperCase()}]
            </p>
          </div>
        </div>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => sound.playClick()}
          className="pixel-btn text-[10px] inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span>INSPECT PROFILE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Pixel Card */}
      <div className="pixel-card p-5 sm:p-6 bg-[#EFE3C8]/95 shadow-[6px_6px_0px_#3C2A21]">
        {/* Top Bar: Year Switcher & Live Inspector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b-2 border-[#8B5E3C] pb-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-pixel text-[10px] text-[#3C2A21] flex items-center gap-1.5 mr-2">
              <Flame className="w-3.5 h-3.5 text-[#A04747]" />
              TIMELINE:
            </span>
            {YEAR_OPTIONS.map((yr) => {
              const isActive = selectedYear === yr;
              return (
                <button
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  className={`px-2.5 py-1 font-pixel text-[9px] border-2 border-[#3C2A21] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3C2A21] text-[#E0A96D] shadow-[2px_2px_0px_#8B5E3C]'
                      : 'bg-[#F7EFE5] text-[#3C2A21] hover:bg-[#DFD3C3]'
                  }`}
                >
                  {yr === 'last' ? 'LAST YEAR' : yr}
                </button>
              );
            })}
          </div>

          {/* Interactive Hover Readout */}
          <div className="px-3 py-1 bg-[#1E120B] border-2 border-[#3C2A21] font-silkscreen text-[11px] text-[#E0A96D] min-h-[28px] flex items-center">
            {hoveredDay ? (
              <span>
                <strong className="text-[#8BA848]">{hoveredDay.count}</strong>{' '}
                {hoveredDay.count === 1 ? 'COMMIT' : 'COMMITS'} ON{' '}
                <span className="text-[#EFE3C8]">{hoveredDay.date}</span>
              </span>
            ) : (
              <span className="text-[#D0B8A8]">HOVER ANY TILE TO INSPECT COMMITS</span>
            )}
          </div>
        </div>

        {/* Mini RPG Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#596B26] shrink-0" />
            <div>
              <div className="font-pixel text-sm text-[#596B26]">{loading ? '...' : stats.total}</div>
              <div className="font-silkscreen font-bold text-[9px] text-[#1E120B]">TOTAL COMMITS</div>
            </div>
          </div>
          <div className="p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] flex items-center gap-2.5">
            <Flame className="w-4 h-4 text-[#8B3A3A] shrink-0" />
            <div>
              <div className="font-pixel text-sm text-[#8B3A3A]">{loading ? '...' : `${stats.currentStreak}D`}</div>
              <div className="font-silkscreen font-bold text-[9px] text-[#1E120B]">CURRENT STREAK</div>
            </div>
          </div>
          <div className="p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] flex items-center gap-2.5">
            <Trophy className="w-4 h-4 text-[#C27A2F] shrink-0" />
            <div>
              <div className="font-pixel text-sm text-[#C27A2F]">{loading ? '...' : `${stats.longestStreak}D`}</div>
              <div className="font-silkscreen font-bold text-[9px] text-[#1E120B]">BEST STREAK</div>
            </div>
          </div>
          <div className="p-2.5 bg-[#F7EFE5] border-2 border-[#3C2A21] flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#6B4527] shrink-0" />
            <div>
              <div className="font-pixel text-sm text-[#6B4527]">{loading ? '...' : stats.activeDays}</div>
              <div className="font-silkscreen font-bold text-[9px] text-[#1E120B]">ACTIVE DAYS</div>
            </div>
          </div>
        </div>

        {/* Scrollable Pixel Contribution Grid */}
        <div className="bg-[#F7EFE5] border-2 border-[#3C2A21] p-4 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center font-pixel text-xs text-[#8B5E3C] animate-pulse">
              LOADING COMMIT LOGS FROM GITHUB...
            </div>
          ) : error ? (
            <div className="py-8 text-center font-silkscreen text-xs text-[#8B3A3A] font-bold">
              [OFFLINE — UNABLE TO REACH GITHUB API. VIEW PROFILE DIRECTLY ABOVE.]
            </div>
          ) : (
            <div className="min-w-[740px]">
              {/* High-Contrast Month Labels */}
              <div className="flex ml-10 mb-1.5 relative h-4">
                {monthLabels.map((m, idx) => (
                  <span
                    key={`${m.label}-${idx}`}
                    style={{ left: `${(m.colIndex / weeks.length) * 100}%` }}
                    className="absolute font-silkscreen font-bold text-[10px] text-[#1E120B] tracking-tight"
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Weekday Labels + Grid Columns */}
              <div className="flex items-start gap-2">
                {/* High-Contrast Day Labels */}
                <div className="grid grid-rows-7 gap-[3px] w-8 shrink-0 font-silkscreen font-bold text-[9px] text-[#1E120B] text-right pr-1">
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">MON</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">WED</span>
                  <span className="h-[11px] leading-[11px]"></span>
                  <span className="h-[11px] leading-[11px]">FRI</span>
                  <span className="h-[11px] leading-[11px]"></span>
                </div>

                {/* 53-Week Grid */}
                <div className="flex gap-[3px] flex-1 justify-between">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                      {week.map((day, dIdx) =>
                        day ? (
                          <button
                            key={day.date}
                            type="button"
                            onMouseEnter={() => setHoveredDay(day)}
                            onFocus={() => setHoveredDay(day)}
                            onClick={() => {
                              sound.playClick();
                              setHoveredDay(day);
                            }}
                            aria-label={`${day.count} commits on ${day.date}`}
                            className={`w-[11px] h-[11px] border transition-transform hover:scale-125 hover:z-10 cursor-pointer ${
                              LEVEL_COLORS[day.level]
                            }`}
                          />
                        ) : (
                          <div key={`empty-${wIdx}-${dIdx}`} className="w-[11px] h-[11px]" />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend Footer */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-silkscreen font-bold text-[10px] text-[#3C2A21]">
          <span>● LIVE DATA • CLICK OR HOVER SQUARES FOR DETAILS</span>
          <div className="flex items-center gap-1.5">
            <span>LESS</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span key={lvl} className={`w-3 h-3 border ${LEVEL_COLORS[lvl]}`} />
            ))}
            <span>MORE</span>
          </div>
        </div>
      </div>
    </section>
  );
};