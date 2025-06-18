import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getExperience } from "../../api/experience";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
  TechnologiesUsed: string[];
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExperience();
      setExperiences(data);
    };
    fetchData();
  }, []);

  return (
    <section id="experience" className="py-20 px-4 bg-zinc-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-zinc-100 mb-20"
        >
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Professional Journey
          </span>
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline trunk */}
          <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-amber-500/10 via-amber-500 to-amber-500/10"></div>

          {/* Horizontal branches container */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Branch connector */}
                <div
                  className={`absolute top-1/2 h-0.5 w-12 bg-amber-500 ${
                    index % 2 === 0 ? "left-1/2" : "right-1/2"
                  }`}
                ></div>

                {/* Experience leaf/node */}
                <div
                  className={`relative ml-12 ${
                    index % 2 === 0
                      ? "md:ml-0 md:pr-12 md:text-right"
                      : "md:ml-12"
                  }`}
                >
                  {/* Timeline marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500 border-4 border-zinc-900 z-10 group-hover:scale-150 transition-transform duration-300"
                    style={{ [index % 2 === 0 ? "right" : "left"]: "-6.5px" }}
                  ></div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-zinc-800 rounded-2xl shadow-2xl border-l-[3px] border-amber-500 hover:border-amber-400 transition-all duration-300"
                  >
                    {/* Position and date */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-zinc-100">
                          {exp.position}
                        </h3>
                        <h4 className="text-lg font-medium text-amber-400 mt-1">
                          @ {exp.company}
                        </h4>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                          {exp.currentlyWorking ? "Current" : "Past"}
                        </span>
                        <p className="text-sm text-zinc-400">
                          {exp.startDate} –{" "}
                          {exp.currentlyWorking ? "Present" : exp.endDate}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Technologies branch */}
                    <div className="mt-6 pt-4 border-t border-zinc-700">
                      <div className="flex flex-wrap gap-3">
                        {exp.TechnologiesUsed.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="inline-flex items-center gap-1 bg-zinc-700/50 text-amber-300 px-3 py-1.5 text-sm rounded-full border border-zinc-600 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
