import { motion } from "framer-motion";

interface AboutProps {
  personalInfo: {
    name: string;
    email: string;
    experience: string;
    location: string;
    about: string;
  };
  resumeUrl: string;
}

const About = ({ personalInfo, resumeUrl }: AboutProps) => {
  return (
    <section id="about" className="py-20 px-4 bg-zinc-900">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-zinc-100 mb-12"
        >
          About{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Me
          </span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3 mb-8 md:mb-0 flex justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-amber-600/40 rounded-lg blur-md opacity-30 transform rotate-3"></div>
              <img
                src="/profile.png"
                alt="About Me"
                className="relative rounded-lg w-full h-full object-cover border-4 border-zinc-700 shadow-lg"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-2/3 md:pl-12"
          >
            <h3 className="text-2xl font-semibold text-zinc-100 mb-4">
              Who am I?
            </h3>
            <p className="text-zinc-300 mb-6">{personalInfo.about}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { name: "Name", value: personalInfo.name },
                { name: "Email", value: personalInfo.email },
                { name: "Experience", value: personalInfo.experience },
                { name: "Location", value: personalInfo.location },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-zinc-800 p-4 rounded-lg border border-zinc-700"
                >
                  <h4 className="text-amber-400 text-sm">{item.name}</h4>
                  <p className="text-zinc-100 font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-900 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href={resumeUrl} download>
                Download CV
              </a>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
