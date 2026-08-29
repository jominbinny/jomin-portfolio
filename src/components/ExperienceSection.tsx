import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            05 — Experience
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Where I've worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[3px] top-1.5 h-[9px] w-[9px] rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`flex-1 pl-8 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div
                    className={`inline-block rounded-xl border border-border bg-card/50 p-5 text-left backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card ${i % 2 === 0 ? "md:text-left" : ""}`}
                  >
                    <div className="mb-1 flex items-center gap-2 md:justify-start">
                      <span className="font-mono text-xs text-primary">{exp.period}</span>
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {exp.company}
                    </h3>
                    <p className="mb-2 font-mono text-xs text-muted-foreground">{exp.role}</p>
                    <p className="mb-3 text-sm text-muted-foreground">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for other side */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
