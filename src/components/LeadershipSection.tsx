import { motion } from "framer-motion";
import { leadership } from "@/lib/data";

export function LeadershipSection() {
  return (
    <section id="leadership" className="section-padding px-6">
      <div className="mx-auto max-w-5xl content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-[1.25rem] tracking-wide text-foreground sm:text-[1.5rem] md:text-[1.75rem]">
            Building communities, not just code
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Leading technical communities and organizing events that impact thousands.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {leadership.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card">
                <span className="mb-3 block font-mono text-xs text-primary">{item.period}</span>
                <h3 className="mb-2 font-heading text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-4 font-content text-sm text-muted-foreground">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-primary"
                    >
                      {stat}
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
