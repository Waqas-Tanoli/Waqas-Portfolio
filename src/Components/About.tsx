import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/profile";

interface About {
  name: string;
  roles: string[];
  bio: string;
  avatarUrl: string;
  email: string;
  resumeUrl: string;
  phone: string;
  location: string;
  experience: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
}

const About = () => {
  const [profile, setProfile] = useState<About | null>(null);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [bioToShow, setBioToShow] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);

        // Initialize bio display
        if (profileData?.bio) {
          setBioToShow(
            profileData.bio.length > 150
              ? profileData.bio.substring(0, 150) + "..."
              : profileData.bio
          );
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  const toggleBio = () => {
    if (!profile?.bio) return;

    if (isBioExpanded) {
      setBioToShow(profile.bio.substring(0, 1000) + "...");
    } else {
      setBioToShow(profile.bio);
    }
    setIsBioExpanded(!isBioExpanded);
  };

  return (
    <section id="about" className="py-20 px-4 bg-zinc-900">
      <div className="container mx-40">
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
          {/* <motion.div
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
          </motion.div> */}

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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 max-w-lg"
            >
              <div className="relative ">
                <p className="text-zinc-300 text-lg leading-relaxed w-full">
                  {bioToShow}
                  {profile?.bio && profile.bio.length > 200 && (
                    <button
                      onClick={toggleBio}
                      className="ml-2 text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200 focus:outline-none"
                    >
                      {isBioExpanded ? (
                        <span className="flex items-center">
                          Read Less
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Read More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  )}
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { name: "Name", value: profile?.name, icon: "👤" },
                { name: "Email", value: profile?.email, icon: "✉️" },
                {
                  name: "Experience",
                  value: profile?.experience
                    ? `${profile.experience}+ years`
                    : "",
                  icon: "⏳",
                },
                { name: "Location", value: profile?.location, icon: "📍" },
              ]
                .filter((item) => item.value)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 hover:border-amber-500/50 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-amber-400">{item.icon}</span>
                      <div>
                        <h4 className="text-amber-400 text-sm font-medium">
                          {item.name}
                        </h4>
                        <p className="text-zinc-100 font-medium mt-1">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-900 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View My Work
              </motion.button>

              {/* Social Links */}
              <div className="flex space-x-3">
                {profile?.socialLinks?.github && (
                  <motion.a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-zinc-800 rounded-full border border-amber-500/20 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-amber-400"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.a>
                )}

                {profile?.socialLinks?.linkedin && (
                  <motion.a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-zinc-800 rounded-full border border-amber-500/20 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-amber-400"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
