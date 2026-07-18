import { ctfWriteups } from '@/data/ctfWriteups';
import FadeIn from '@/components/ui/FadeIn';

export default function CTFWriteupsSection() {
  return (
    <section className="py-[120px] bg-surface-container-low/40 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono-tactical text-xs tracking-[0.3em] text-secondary mb-2">
            [ DIRECTORY: /WRITEUPS ]
          </p>
          <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">
            Tech Writeups
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {ctfWriteups.map((writeup, index) => (
            <FadeIn
              key={index}
              delay={index * 0.1}
              className="bg-surface-container p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">
                  description
                </span>
              </div>
              <h4 className="text-2xl font-bold mb-4">{writeup.title}</h4>
              <div className="space-y-6 text-sm">
                <div>
                  <span className="font-mono-tactical text-primary uppercase block text-xs mb-1">
                    Problem
                  </span>
                  <p className="text-on-surface-variant">{writeup.summary}</p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <span className="font-mono-tactical text-primary uppercase block text-xs mb-1">
                      Tools
                    </span>
                    <p className="text-on-surface-variant">
                      {writeup.tools.join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono-tactical text-primary uppercase block text-xs mb-1">
                      Time
                    </span>
                    <p className="text-on-surface-variant">2 Hours</p>
                  </div>
                </div>
                <div>
                  <span className="font-mono-tactical text-primary uppercase block text-xs mb-1">
                    Resolution
                  </span>
                  <p className="text-secondary">{writeup.result}</p>
                </div>
                <span className="text-primary font-mono-tactical uppercase text-xs tracking-widest mt-4 inline-block">
                  _ [VIEW_FULL_LOG]
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
