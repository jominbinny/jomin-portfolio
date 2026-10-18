import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    label: "Problem",
    description: "Understand the real problem before writing any code.",
  },
  {
    number: "02",
    label: "Research",
    description: "Explore existing solutions, patterns, and trade-offs.",
  },
  {
    number: "03",
    label: "Architecture",
    description: "Design the system — data flow, APIs, database schema.",
  },
  {
    number: "04",
    label: "Implement",
    description: "Build incrementally with clean, maintainable code.",
  },
  {
    number: "05",
    label: "Test",
    description: "Verify behavior, edge cases, and performance.",
  },
  {
    number: "06",
    label: "Iterate",
    description: "Refactor based on feedback, new constraints, and learning.",
  },
];

export function HowIThinkSection() {
  return (
    <section className="section-padding px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            02 — Process
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            How I think
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Building software isn't just about code — it's about understanding problems, making
            decisions, and iterating toward better solutions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[15px] top-1 h-[9px] w-[9px] rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="font-mono text-xs text-primary">{step.number}</span>
                    <span className="font-heading text-lg font-bold text-foreground">
                      {step.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
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
