import skillsData from './skills.json';

export type Skill = {
  name: string;
  level: number;
};

export type SkillsByCategory = Record<string, Skill[]>;

/** Canonical skills — source of truth is `skills.json` (admin-editable). */
export const skills: SkillsByCategory = skillsData;
