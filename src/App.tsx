import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

function Portfolio() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <LeadershipSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="site-frame min-h-screen bg-background text-foreground">
      <Navbar />
      <Portfolio />
    </div>
  );
}
