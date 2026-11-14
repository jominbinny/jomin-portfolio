import { motion } from "framer-motion";
import { aboutText } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="section-padding px-6">
      <div className="mx-auto max-w-5xl content-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            A bit about me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="space-y-5">
            {aboutText.map((text, i) => (
              <p key={i} className="font-content text-base leading-relaxed text-muted-foreground">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
