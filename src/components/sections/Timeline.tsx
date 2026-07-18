import { timeline } from '@/data/timeline';
import { config } from '@/data/config';
import FadeIn from '@/components/ui/FadeIn';

export default function TimelineSection() {
  return (
    <section className="py-[120px] bg-surface-container-low/40 px-6 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <div className="lg:col-span-2 bg-surface-container-low p-8">
            <h3 className="font-mono-tactical text-xl font-bold mb-12 uppercase tracking-widest text-primary">
              SYSTEM_LOG_TIMELINE
            </h3>
            <div className="space-y-12 relative">
              <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-outline-variant/30"></div>
              {timeline.map((event, index) => (
                <FadeIn key={index} delay={index * 0.1} className="relative pl-10">
                  <div
                    className={`absolute left-0 top-1 w-2 h-2 ${
                      index === timeline.length - 1
                        ? 'bg-primary shadow-[0_0_10px_#a0ffc4]'
                        : 'bg-primary'
                    }`}
                  ></div>
                  <span className="font-mono-tactical text-secondary block text-sm mb-1">
                    [{event.year}]
                  </span>
                  <h4 className="text-lg font-bold">{event.event}</h4>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="bg-surface-container p-8 space-y-8">
            <h3 className="font-mono-tactical text-xl font-bold uppercase text-secondary">
              LEARNING_ROADMAP
            </h3>
            <div className="space-y-6">
              <div>
                <p className="font-mono-tactical text-primary text-xs uppercase tracking-tighter mb-4">
                  CURRENT_MODULES
                </p>
                <div className="space-y-2">
                  {config.currentFocus.learning.map((item, i) => (
                    <div
                      key={i}
                      className="bg-surface-bright p-3 border-r-2 border-primary"
                    >
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 opacity-60">
                <p className="font-mono-tactical text-on-surface-variant text-xs uppercase tracking-tighter mb-4">
                  NEXT_SEQUENCE
                </p>
                <div className="space-y-2">
                  {config.currentFocus.next.map((item, i) => (
                    <div
                      key={i}
                      className="bg-surface-container-highest p-3 border-r-2 border-secondary"
                    >
                      <p className="text-sm italic">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
