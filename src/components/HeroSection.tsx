import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="hero-grid mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            {personalInfo.role} / {personalInfo.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-title font-pixel text-[clamp(2.5rem,6.2vw,6.5rem)] leading-[0.9] tracking-[-0.08em]"
          >
            <span className="block">JOMIN</span>
            <span className="block">
              BINNY<span className="text-primary">.</span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-xl font-mono text-sm leading-7 text-muted-foreground"
          >
            Developer, builder and technology enthusiast. I turn ideas into digital experiences
            through code, creativity and experimentation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center justify-start gap-5"
          >
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-primary px-6 py-3 font-mono text-xs text-primary-foreground transition-transform hover:-translate-y-1"
            >
              View my work →
            </button>
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-mono text-xs underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              Get in touch
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hero-photo-card"
        >
          <div className="hero-photo-label">01 / PROFILE</div>
          <img src="/og-image.png" alt="Jomin Binny" className="hero-photo" />
          <div className="hero-photo-badge">BUILD / SHIP / REPEAT</div>
        </motion.div>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Scroll to explore</span>
        <span>01 — 07</span>
      </div>
    </section>
  );
}
