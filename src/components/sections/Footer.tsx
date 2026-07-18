import { config } from '@/data/config';

export default function Footer() {
  return (
    <>
      <div className="bg-gradient-to-r from-transparent via-[#484848]/20 to-transparent h-[1px] w-full"></div>
      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest/40 backdrop-blur-sm font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">
        <div className="text-[#a0ffc4] font-bold">
          © {new Date().getFullYear()} [GHOST_IN_THE_MACHINE] | UPTIME: 99.99%
        </div>
        <div className="flex gap-8 opacity-80">
          <a
            href={config.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ababab] hover:text-[#a0ffc4] transition-colors"
          >
            GITHUB
          </a>
          <a
            href={config.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ababab] hover:text-[#a0ffc4] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={config.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ababab] hover:text-[#a0ffc4] transition-colors"
          >
            HTB_PROFILE
          </a>
        </div>
        <div className="text-[#00bdfd] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00bdfd] animate-pulse"></span>
          STATION_01_CONNECTED
        </div>
      </footer>
    </>
  );
}
