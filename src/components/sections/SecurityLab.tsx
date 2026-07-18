import { securityLabs } from '@/data/securityLabs';
import FadeIn from '@/components/ui/FadeIn';

export default function SecurityLabSection() {
  return (
    <section className="py-[120px] bg-surface-container/40 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-primary mb-2">
            [ SYSTEM_LOG: SECURITY_LAB ]
          </p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">
            Cyber Lab Entries
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityLabs.map((lab, index) => (
            <FadeIn
              key={index}
              delay={index * 0.1}
              className="bg-surface-container-low p-6 group cursor-pointer hover:bg-surface-bright transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-mono-tactical text-primary">{lab.name}</h4>
                  <p className="text-xs text-on-surface-variant">{lab.tool}</p>
                </div>
                <span className="material-symbols-outlined text-secondary">
                  analytics
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-[10px] font-mono-tactical">
                <div>
                  <span className="text-on-surface-variant block uppercase">
                    Tool
                  </span>
                  <span className="text-secondary">{lab.tool}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block uppercase">
                    Action
                  </span>
                  <span className="text-secondary">{lab.tool}_CAPTURE</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block uppercase">
                    Result
                  </span>
                  <span className="text-primary">ANALYSIS_COMPLETE</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
