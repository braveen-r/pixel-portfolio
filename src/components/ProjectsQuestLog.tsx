import { FolderGit2, ExternalLink } from 'lucide-react';

export const ProjectsQuestLog = () => {
  const projects = [
    {
      id: 1,
      title: "The Zero-Cost Telemetry Platform",
      description: "A blazingly fast observability pipeline capturing real-time Arch Linux kernel events using eBPF, visualized on a custom React dashboard.",
      tech: ["eBPF", "Python", "React", "C"],
      link: "https://github.com/braveen-r"
    },
    {
      id: 2,
      title: "Gitops Devsecops K8s",
      description: "Automates security scanning, image building, and continuous delivery to a lightweight local Kubernetes cluster using ArgoCD.",
      tech: ["Docker", "K8s", "Shell", "ArgoCD"],
      link: "https://github.com/braveen-r"
    },
    {
      id: 3,
      title: "The Archer Dotfiles",
      description: "A highly customized, blazingly fast Arch Linux setup using bspwm, modified for a seamless daily-driver experience.",
      tech: ["Shell", "Python", "SCSS"],
      link: "https://github.com/braveen-r"
    },
    {
      id: 4,
      title: "Distro-Doctor",
      description: "Professional-grade DevOps CLI for automatically validating project installation instructions across multiple Linux distributions in parallel.",
      tech: ["Python", "Docker", "CLI"],
      link: "https://github.com/braveen-r"
    },
    {
      id: 5,
      title: "Restore-Drill",
      description: "Automated SRE disaster recovery engine that extracts snapshots, measures SLAs, executes smoke tests, and dispatches runbooks via Discord.",
      tech: ["Python", "Shell", "JavaScript"],
      link: "https://github.com/braveen-r"
    },
    {
      id: 6,
      title: "Archlings",
      description: "A Rustlings-inspired Arch Linux troubleshooting trainer providing sandboxed labs for practicing system repairs with telemetry.",
      tech: ["Python", "Shell", "Docker"],
      link: "https://github.com/braveen-r"
    }
  ];

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
      {/* Section Header */}
<div className="flex items-center gap-3 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#1E120B] border-4 border-[#3C2A21] p-6 shadow-[6px_6px_0px_#3C2A21] hover:-translate-y-1 hover:shadow-[10px_10px_0px_#3C2A21] transition-all">
            <div className="flex justify-between items-start mb-4">
              <FolderGit2 className="w-8 h-8 text-[#A67B5B]" />
              <a href={project.link} target="_blank" rel="noreferrer" className="text-[#8B5E3C] hover:text-[#E0A96D] transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <h3 className="font-pixel text-lg text-white mb-2 tracking-wide">{project.title}</h3>
            <p className="font-retro text-[#D0B8A8] mb-6 min-h-[70px] leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
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