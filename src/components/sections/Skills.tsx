import { readJsonFile } from '@/lib/data-store';
import FadeIn from '@/components/ui/FadeIn';
import type { Skill, SkillsByCategory } from '@/data/skills';

export default function SkillsSection() {
  let skills: SkillsByCategory = {};
  try {
    skills = readJsonFile<SkillsByCategory>('skills.json');
  } catch {
    skills = {};
  }

  const entries = Object.entries(skills);

  return (
    <section
      id="skills"
      className="py-[120px] bg-surface-container/40 px-6 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-outline-variant/20 pb-4">
            <h2 className="font-mono-tactical text-2xl font-bold text-primary uppercase">
              SKILLS_DASHBOARD
            </h2>
            <span className="font-mono-tactical text-xs text-on-surface-variant">
              VULN_SCANNER: ONLINE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {entries.slice(0, 3).map(([category, skillList], catIndex) => (
              <FadeIn
                key={category}
                delay={catIndex * 0.1}
                className="bg-surface-container p-8 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-mono-tactical text-secondary uppercase font-semibold">
                    {category}
                  </h3>
                  <span className="text-xs font-mono-tactical text-on-surface-variant">
                    {skillList[0]?.level || 0}%
                  </span>
                </div>
                <p className="font-mono-tactical text-primary text-xl tracking-tight">
                  [
                  {'█'.repeat(Math.floor((skillList[0]?.level || 0) / 10))}
                  {'░'.repeat(10 - Math.floor((skillList[0]?.level || 0) / 10))}
                  ]
                </p>
                <ul className="text-xs font-mono-tactical text-on-surface-variant space-y-1 pt-4">
                  {skillList.slice(0, 3).map((skill: Skill, i: number) => (
                    <li key={i}>{skill.name.toUpperCase()}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {entries.map(([category, skillList]) => (
              <div key={category} className="border border-outline-variant/30 p-4">
                <p className="font-mono-tactical text-[10px] text-on-surface-variant uppercase tracking-widest mb-2">
                  Category: {category}
                </p>
                <p className="text-sm">
                  {skillList.map((s) => s.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
