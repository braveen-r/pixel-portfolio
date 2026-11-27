import { useState } from 'react';
import { FolderGit2, ExternalLink, Lock, Filter } from 'lucide-react';
import { sound } from '../utils/audio';

type Category = 'ALL' | 'DEVOPS / SRE' | 'LINUX' | 'FRONTEND';

const CATEGORIES: Category[] = ['ALL', 'DEVOPS / SRE', 'LINUX', 'FRONTEND'];

export const ProjectsQuestLog = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');

  const projects = [
    {
      id: 1,
      title: "React Cyberpunk Portfolio",
      description: "A highly interactive, glassmorphism-based developer portfolio featuring dynamic theming and 3D interactions.",
      tech: ["React", "Styled Components", "Vercel"],
      link: "https://github.com/braveen-r",
      status: "COMPLETED",
      categories: ["FRONTEND"]
    },
    {
      id: 2,
      title: "The Archer Dotfiles",
      description: "A highly customized, blazingly fast Arch Linux setup using bspwm, heavily modified for a seamless, daily-driver experience.",
      tech: ["Shell", "Python", "SCSS"],
      link: "https://github.com/braveen-r/the_archer_dotfiles",
      status: "COMPLETED",
      categories: ["LINUX"]
    },
    {
      id: 3,
      title: "Gitops Devsecops K8s",
      description: "Automates security scanning, container image building, vulnerability assessment, and continuous delivery to a lightweight local Kubernetes cluster using ArgoCD.",
      tech: ["JavaScript", "Dockerfile", "Shell"],
      link: "https://github.com/braveen-r/gitops-devsecops-k8s",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE"]
    },
    {
      id: 4,
      title: "The Zero-Cost Telemetry Platform",
      description: "A blazingly fast observability pipeline capturing real-time Arch Linux kernel events using eBPF, visualized on a custom React dashboard.",
      tech: ["JavaScript", "Python", "C", "HCL"],
      link: "https://github.com/braveen-r/zero-cost-telemetry-platform",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE", "LINUX", "FRONTEND"]
    },
    {
      id: 5,
      title: "Distro-Doctor",
      description: "Professional-grade DevOps CLI and CI/CD utility for automatically validating project installation instructions across multiple Linux distributions in parallel.",
      tech: ["Python", "Docker", "Shell"],
      link: "https://github.com/braveen-r/distro-doctor",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE", "LINUX"]
    },
    {
      id: 6,
      title: "Archlings",
      description: "A Rustlings-inspired Arch Linux troubleshooting trainer providing sandboxed, Docker-based labs for practicing system repairs with telemetry.",
      tech: ["Python", "Shell", "Docker"],
      link: "https://github.com/braveen-r/archlings",
      status: "COMPLETED",
      categories: ["LINUX", "DEVOPS / SRE"]
    },
    {
      id: 7,
      title: "Chaos-Stack",
      description: "A local Chaos Engineering CLI and SRE Observability Control Plane built to intentionally break Docker and emulated AWS infrastructure to validate system resilience.",
      tech: ["Python", "AWS", "Docker"],
      link: "https://github.com/braveen-r/chaos-stack",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE"]
    },
    {
      id: 8,
      title: "Restore-Drill",
      description: "An automated SRE disaster recovery engine that extracts backup snapshots, measures RTO/RPO SLAs, executes integrity smoke tests, and dispatches dynamic runbooks via Discord.",
      tech: ["JavaScript", "Python", "Shell"],
      link: "https://github.com/braveen-r/restore-drill",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE"]
    },
    {
      id: 9,
      title: "Build-Pulse Analytics",
      description: "A zero-cost, serverless DevOps observability platform that extracts real-time CI/CD pipeline metrics from GitHub Actions and visualizes them on a React dashboard.",
      tech: ["JavaScript", "CSS", "HTML"],
      link: "https://github.com/braveen-r/build-pulse-analytics",
      status: "COMPLETED",
      categories: ["DEVOPS / SRE", "FRONTEND"]
    },
    {
      id: 10,
      title: "CyberNerd",
      description: "A dual-purpose IoT security and honeypot project combining an ESP32-C3 sensor node (gas, motion, door, OLED, and ThingSpeak telemetry) with a multi-port Python TCP honeypot that logs suspicious probes to JSON.",
      tech: ["C++", "Python", "ESP32-C3"],
      link: "",
      status: "IN PROGRESS",
      categories: ["SECURITY"]
    },
    {
      id: 11,
      title: "UNKNOWN ARTIFACT",
      description: "A classified side-quest currently hidden in the shadows. Gathering resources and planning system architecture...",
      tech: ["???", "Soon"],
      link: "",
      status: "UPCOMING",
      categories: ["ALL"]
    }
  ];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.categories.includes(activeCategory));

  const getCategoryCount = (cat: Category) => {
    if (cat === 'ALL') return projects.length;
    return projects.filter((p) => p.categories.includes(cat)).length;
  };

  const handleCategoryClick = (cat: Category) => {
    sound.playClick();
    setActiveCategory(cat);
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8B5E3C] text-white border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-pixel text-lg sm:text-xl text-[#1E120B] uppercase">
              ACTIVE_QUESTS (PROJECTS)
            </h2>
            <p className="font-silkscreen text-xs text-[#8B5E3C] uppercase">
              [OPEN-SOURCE REPOSITORIES • SYSTEM ARCHITECTURE & AUTOMATION]
            </p>
          </div>
        </div>

        {/* Pixel Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-[#8B5E3C] hidden sm:block mr-1" />
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 font-pixel text-[9px] sm:text-[10px] border-2 border-[#3C2A21] transition-all cursor-pointer flex items-center gap-1.5
                  ${
                    isActive
                      ? 'bg-[#3C2A21] text-[#E0A96D] shadow-[2px_2px_0px_#8B5E3C] -translate-y-0.5'
                      : 'bg-[#EFE3C8] text-[#3C2A21] hover:bg-[#DFD3C3] shadow-[3px_3px_0px_#3C2A21]'
                  }`}
              >
                <span>{cat}</span>
                <span className={`text-[8px] px-1 py-0.5 ${isActive ? 'bg-[#8B5E3C] text-white' : 'bg-[#DFD3C3] text-[#8B5E3C]'}`}>
                  {getCategoryCount(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className={`flex flex-col h-full bg-[#1E120B] border-4 border-[#3C2A21] p-6 shadow-[6px_6px_0px_#3C2A21] transition-all relative
              ${project.status === 'UPCOMING' ? 'opacity-80 border-dashed border-[#5A4332]' : 'hover:-translate-y-1 hover:shadow-[10px_10px_0px_#3C2A21]'}`}
          >
            
            {/* Status Badge */}
            {project.status !== 'COMPLETED' && (
              <div className={`absolute -top-3 -right-3 font-pixel text-[8px] px-2 py-1 border-2 border-[#3C2A21] shadow-[2px_2px_0px_#3C2A21]
                ${project.status === 'IN PROGRESS' ? 'bg-[#708238] text-white' : 'bg-[#3C2A21] text-[#D0B8A8]'}`}>
                {project.status}
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              {project.status === 'UPCOMING' ? (
                <Lock className="w-8 h-8 text-[#5A4332]" />
              ) : (
                <FolderGit2 className="w-8 h-8 text-[#A67B5B]" />
              )}
              
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="text-[#8B5E3C] hover:text-[#E0A96D] transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
            
            <h3 className={`font-pixel text-lg mb-2 tracking-wide ${project.status === 'UPCOMING' ? 'text-[#8B5E3C]' : 'text-white'}`}>
              {project.title}
            </h3>
            
            <p className="font-retro text-[#D0B8A8] mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.tech.map((t, i) => (
                <span key={i} className="bg-[#3C2A21] text-[#E0A96D] text-[10px] px-2 py-1 font-silkscreen border border-[#8B5E3C] shadow-[1px_1px_0px_#1E120B]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};