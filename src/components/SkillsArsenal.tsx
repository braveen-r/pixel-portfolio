import React from 'react';
import { Cpu, Code2, Server, Wrench } from 'lucide-react';

export const SkillsArsenal = () => {
  // Your actual skills categorized into RPG classes
  const skillCategories = [
    {
      title: "FRONTEND MAGIC",
      icon: <Code2 className="w-4 h-4 text-[#A04747]" />,
      color: "border-[#A04747]",
      skills: ["React", "JavaScript", "Tailwind CSS", "HTML5/CSS3", "Styled Components", "Vite"]
    },
    {
      title: "BACKEND & CLOUD",
      icon: <Server className="w-4 h-4 text-[#708238]" />,
      color: "border-[#708238]",
      skills: ["Node.js", "Docker", "REST APIs", "GitHub Actions", "Vercel"]
    },
    {
      title: "CORE PROGRAMMING",
      icon: <Cpu className="w-4 h-4 text-[#E0A96D]" />,
      color: "border-[#E0A96D]",
      skills: ["Python", "Bash / Shell", "C", "Java"]
    },
    {
      title: "SYSTEM & ENVIRONMENT",
      icon: <Wrench className="w-4 h-4 text-[#8B5E3C]" />,
      color: "border-[#8B5E3C]",
      skills: ["Arch Linux", "Neovim", "Hyprland / bspwm", "Git", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#8B5E3C] text-white border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-pixel text-lg sm:text-xl text-[#1E120B]">
            SKILLS ARSENAL
          </h2>
          <p className="font-silkscreen text-xs text-[#8B5E3C]">
            [EQUIPPED TECHNOLOGIES &amp; DEVELOPMENT ENVIRONMENT]
          </p>
        </div>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className={`pixel-card p-5 bg-[#DFD3C3]/95 border-t-4 ${category.color} shadow-[4px_4px_0px_#3C2A21] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#3C2A21] transition-all duration-200`}
          >
            <div className="flex items-center gap-2 mb-4 border-b-2 border-[#8B5E3C] pb-2">
              {category.icon}
              <h3 className="font-pixel text-sm text-[#3C2A21]">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="bg-[#EFE3C8] text-[#1E120B] px-2.5 py-1.5 border-2 border-[#3C2A21] font-silkscreen text-[10px] sm:text-xs shadow-[1px_1px_0px_#1E120B] hover:bg-[#3C2A21] hover:text-[#E0A96D] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};