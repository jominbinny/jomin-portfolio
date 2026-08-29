import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";

function ProjectCard({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`rounded-xl border border-border transition-all ${
          isExpanded ? "bg-card" : "bg-card/50 hover:bg-card hover:border-primary/20"
        }`}
      >
        {/* Card header */}
        <button
          onClick={onToggle}
          className="flex w-full items-start gap-4 p-5 text-left"
          aria-expanded={isExpanded}
        >
          <span className="mt-0.5 font-mono text-xs text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-bold text-foreground">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 shrink-0 text-muted-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </motion.div>
        </button>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 px-5 pb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expanded case study */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-5 border-t border-border px-5 py-5">
                <CaseStudyBlock title="Problem" content={project.problem} />
                <CaseStudyBlock title="Approach" content={project.approach} />
                <CaseStudyBlock title="Implementation" content={project.implementation} />
                <CaseStudyBlock title="Challenges" content={project.challenges} />
                <CaseStudyBlock title="Result" content={project.result} highlight />

                {project.links && project.links.length > 0 && (
                  <div>
                    <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Links
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function CaseStudyBlock({
  title,
  content,
  highlight,
}: {
  title: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-primary">
        {title}
      </span>
      <p
        className={`text-sm leading-relaxed ${
          highlight
            ? "rounded-lg bg-primary/5 px-4 py-3 text-foreground font-medium"
            : "text-muted-foreground"
        }`}
      >
        {content}
      </p>
    </div>
  );
}

export function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            03 — Work
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Things I've built
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            From hackathon prototypes to production systems — each project solves a real problem.
          </p>
        </motion.div>

        <div className="space-y-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
