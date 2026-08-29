import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {personalInfo.status}
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {personalInfo.role} / Based in {personalInfo.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl"
          >
            {personalInfo.name.split(" ")[0]}
            <br />
            <span className="gradient-text">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {personalInfo.heroDescription}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-lg bg-foreground px-5 py-2.5 font-mono text-xs font-medium text-background transition-all hover:opacity-90"
          >
            View Projects →
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-lg border border-border bg-card/50 px-5 py-2.5 font-mono text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-card"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Metadata strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub ↗
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn ↗
          </a>
          <span className="font-mono text-xs text-muted-foreground">{personalInfo.location}</span>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px]">⌘K</kbd>{" "}
            to navigate
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[10px] text-muted-foreground">scroll</span>
          <svg
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
