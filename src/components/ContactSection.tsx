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
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
            07 — Contact
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Let's work together
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Have a project in mind or just want to connect? Reach out.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4">
              {[
                {
                  label: "Email",
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  label: "GitHub",
                  value: "github.com/jominbinny",
                  href: personalInfo.github,
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/jominbinny",
                  href: personalInfo.linkedin,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {link.label[0]}
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

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
