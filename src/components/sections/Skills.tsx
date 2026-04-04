'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
}

interface SkillsData {
  [key: string]: Skill[];
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData>({});

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(setSkills);
  }, []);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono text-primary mb-12 text-center"
        >
          SKILLS
        </motion.h2>
        <div className="space-y-8">
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-mono text-secondary mb-6 uppercase">{category}</h3>
              <div className="space-y-4">
                {skillList.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">{skill.name}</span>
                      <span className="text-primary font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-sm h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: catIndex * 0.2 + index * 0.1, duration: 1.5, ease: 'easeOut' }}
                        className="bg-primary h-3 rounded-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}