import { motion } from "framer-motion";
import { aboutText, quickFacts } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="section-padding px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            01 — About
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            A bit about me
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-5">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <div className="space-y-5">
              {aboutText.map((text, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {text}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {quickFacts.map((fact) => (
                  <li
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{fact.label}</span>
                    <span className="text-right font-medium text-foreground">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
