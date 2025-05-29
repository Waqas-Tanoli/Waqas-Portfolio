import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects } from "../../api/projects";

interface Projects {
  id: number | string;
  title: string;
  description?: string;
  imageUrl?: string;
  liveLink?: string;
  githubLink?: string;
  techStack: string[];
}

const Projects = () => {
  const [projects, setProject] = useState<Projects[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProject(projectsData);
        console.log(`Projects Data:`, projectsData);
      } catch (error) {
        console.log(`Error Getting Projects`, error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="work" className="py-20 px-4 bg-zinc-900">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-zinc-100 mb-12"
        >
          My{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Work
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id || project?.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-700"
              >
                <div className="h-48 bg-gradient-to-r from-amber-500/30 to-amber-600/30 relative overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h3 className="text-zinc-100 text-xl font-semibold">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-zinc-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-700 text-amber-400 text-sm rounded-full border border-zinc-600"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className="text-amber-400 hover:text-amber-300 font-medium flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Live
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="text-zinc-400 hover:text-amber-400 font-medium flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-zinc-400 col-span-full py-12">
              No projects found.
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-900 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
