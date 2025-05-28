import About from "./Components/About";
import Hero from "./Components/Hero";

function App() {
  return (
    <>
      <Hero />
      <About
        personalInfo={{
          name: "Waqas Ahmed",
          email: "waqasahm.139@gmail.com",
          experience: "3+ years",
          location: "Abbottabad, Pakistan",
          about: `I am a Full Stack Web Developer and SEO Content Writer with more than 6 years of experience.

I worked for 3 years in a top IT company in Pakistan called NetSol Technologies. After that, I started working online with clients from the USA, UK, and other countries through Fiverr, LinkedIn, and other freelance platforms.

As a developer, I specialize in the MERN stack—MongoDB, Express, React, and Node.js—building high-performing, scalable web applications. I also write SEO-optimized content that helps websites rank better and convert visitors into customers. You can view my past work in the portfolio section of my profile.

Now, I’m excited to bring my skills to Upwork. I’ve heard great things about this platform from my colleagues who work here and shared how professional and respectful Upwork clients are. That’s exactly the kind of environment I want to be a part of.

If you’re looking for a reliable, skilled, and communicative professional who understands both development and SEO—I’d love to work with you.

Thanks for checking out my profile. I look forward to collaborating with you!`,
        }}
        resumeUrl="https://example.com/resume.pdf"
      />
    </>
  );
}

export default App;
