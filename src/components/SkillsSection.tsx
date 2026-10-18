import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            04 — Stack
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I work with
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
              className="group"
            >
              <div className="rounded-xl border border-border bg-card/50 p-5 transition-all hover:border-primary/20 hover:bg-card">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground transition-colors group-hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
