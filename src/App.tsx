import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "@/lib/context";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { Terminal } from "@/components/Terminal";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { HowIThinkSection } from "@/components/HowIThinkSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

function StudioMode() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <AboutSection />
      <HowIThinkSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <LeadershipSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
}

function TerminalMode() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-[52px]"
    >
      <Terminal />
    </motion.div>
  );
}

export default function App() {
  const { mode } = usePortfolio();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CommandPalette />
      <AnimatePresence mode="wait">
        {mode === "studio" ? <StudioMode key="studio" /> : <TerminalMode key="terminal" />}
      </AnimatePresence>
    </div>
  );
}
