import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getProfile } from "../../api/profile";

interface Profile {
  name: string;
  roles: string[];
  bio: string;
  avatarUrl: string;
  email: string;
  resumeUrl: string;
  phone: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

const Hero = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [bioToShow, setBioToShow] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        console.log("Fetched profile:", profileData);
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

  const roles = profile?.roles || [];

  useEffect(() => {
    if (roles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const toggleBio = () => {
    if (!profile?.bio) return;

    if (isBioExpanded) {
      setBioToShow(profile.bio.substring(0, 150) + "...");
    } else {
      setBioToShow(profile.bio);
    }
    setIsBioExpanded(!isBioExpanded);
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-zinc-100 mb-4"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {profile?.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-zinc-300 mb-6 h-12"
          >
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
            >
              {roles[currentRole]}
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 max-w-lg"
          >
            <p className="text-zinc-300 text-lg">
              {bioToShow}
              {profile?.bio && profile.bio.length > 150 && (
                <button
                  onClick={toggleBio}
                  className="ml-2 text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  {isBioExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-900 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border-2 border-amber-500 text-amber-400 font-medium rounded-full hover:bg-zinc-800 transition-all duration-300"
            >
              <a href={profile?.resumeUrl} download>
                Download CV
              </a>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-600/30 rounded-full blur-xl"></div>
            <div className="relative rounded-full overflow-hidden border-4 border-zinc-700 shadow-2xl">
              <img
                src={profile?.avatarUrl}
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
