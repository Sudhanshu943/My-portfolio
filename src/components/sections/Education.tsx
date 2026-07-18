import { readJsonFile } from '@/lib/data-store';

type EducationEntry = {
  degree: string;
  field: string;
  institution: string;
  startYear: string;
  endYear: string;
  cgpa?: string;
  keySubjects?: string[];
};

export default function Education() {
  let education: EducationEntry[] = [];
  try {
    education = readJsonFile<EducationEntry[]>('education.json');
  } catch {
    education = [];
  }

  return (
    <section
      className="py-[120px] bg-surface-container/40 px-6 backdrop-blur-sm"
      id="education"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="material-symbols-outlined text-primary text-2xl">
            school
          </span>
          <h2 className="text-3xl font-bold text-on-surface font-['Space_Grotesk'] uppercase tracking-tight">
            Academic Background
          </h2>
        </div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-surface-container border border-outline-variant/20 p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-mono text-xs tracking-widest">
                      [{edu.startYear} → {edu.endYear}]
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-1">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-on-surface-variant text-sm">
                    {edu.institution}
                  </p>
                  {edu.cgpa && (
                    <p className="text-secondary text-sm mt-2">
                      CGPA: {edu.cgpa}/10
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                    {edu.endYear === 'Present' || edu.startYear === '2023'
                      ? 'Current'
                      : 'Completed'}
                  </span>
                </div>
              </div>

              {edu.keySubjects && edu.keySubjects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20">
                  <p className="text-on-surface-variant text-xs mb-2">
                    Key Subjects:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.keySubjects.map((subject, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-surface-container-low text-on-surface-variant text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center text-on-surface-variant py-8">
            <span className="material-symbols-outlined text-4xl mb-4 opacity-50">
              school
            </span>
            <p>No education data available</p>
          </div>
        )}
      </div>
    </section>
  );
}
