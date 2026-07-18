import { proofOfWork } from '@/data/proofOfWork';
import FadeIn from '@/components/ui/FadeIn';

export default function ProofOfWorkSection() {
  return (
    <section
      className="py-[120px] bg-surface-container-low/40 px-6 backdrop-blur-sm"
      id="proof-of-work"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-primary mb-2">
            [ SYSTEM_LOG: EXPERIENCE ]
          </p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">
            Security Experience
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {proofOfWork.map((entry, index) => (
            <FadeIn
              key={index}
              delay={index * 0.1}
              className={`bg-surface-container p-8 space-y-6 relative overflow-hidden border-l-2 ${
                index % 2 === 0 ? 'border-primary/20' : 'border-secondary/20'
              }`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">
                  {index % 2 === 0 ? 'shield_lock' : 'data_object'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-headline font-bold mb-4 uppercase">
                  {index % 2 === 0
                    ? 'Network Pentesting — Lab A'
                    : 'Malware Analysis — Project Ghost'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-body text-sm">
                  <div className="space-y-1">
                    <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">
                      Challenge
                    </p>
                    <p>{entry.approach.split('.')[0]}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase">
                      Tools
                    </p>
                    <p className="text-secondary">{entry.tools.join(', ')}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase mb-2">
                  Approach &amp; Result
                </p>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {entry.approach}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
