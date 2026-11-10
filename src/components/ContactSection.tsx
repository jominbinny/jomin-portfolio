import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`;
  };

  return (
    <section id="contact" className="section-padding px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Let's work together
          </h2>
          <p className="mt-4 max-w-lg font-content text-muted-foreground">
            Have a project in mind or just want to connect? Reach out.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl content-wrap">
          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm"
          >
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
            <textarea
              placeholder="Your message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-lg bg-foreground px-5 py-2.5 font-mono text-xs font-medium text-background transition-all hover:opacity-90"
            >
              Send Message →
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
