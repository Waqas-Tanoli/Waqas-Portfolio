import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSkills } from "../../api/skills";

interface SkillItem {
  _id: string;
  name: string;
  logo: string;
}

interface SkillsResponse {
  skillSet: SkillItem[];
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsData: SkillsResponse[] = await getSkills();
      if (skillsData && skillsData.length > 0) {
        setSkills(skillsData[0].skillSet);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-16 px-4 bg-zinc-900">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-zinc-100 mb-8"
        >
          My{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Skills
          </span>
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-amber-500/50 transition-all flex flex-col items-center"
            >
              <div className="w-8 h-8 mb-1 flex items-center justify-center">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-zinc-300 text-center font-medium">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
