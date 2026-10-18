import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, personalInfo } from "@/lib/data";
import { usePortfolio } from "@/lib/context";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, setMode, theme, setTheme } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mode === "terminal") return;
      const sections = navItems.map((item) => item.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          aria-label="Scroll to top"
        >
          {personalInfo.firstName}
          <span className="text-primary">.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {mode === "studio" &&
            navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-md bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

          {/* Separator */}
          <div className="mx-2 h-4 w-px bg-border" />

          {/* Mode toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <button
              onClick={() => setMode("studio")}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition-all ${
                mode === "studio"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to Studio mode"
            >
              Studio
            </button>
            <button
              onClick={() => setMode("terminal")}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition-all ${
                mode === "terminal"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Switch to Terminal mode"
            >
              Terminal
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>

          {/* Command palette hint */}
          <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline-block">
            ⌘K
          </kbd>

          {/* Resume */}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-foreground px-3 py-1.5 font-mono text-xs font-medium text-background transition-all hover:opacity-90"
          >
            Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMode(mode === "studio" ? "terminal" : "studio")}
            className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
            aria-label="Toggle mode"
          >
            {mode === "studio" ? "▸ _" : "◂ □"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1 p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-foreground"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {mode === "studio" &&
                navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="rounded-lg px-3 py-2 text-left font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              <div className="my-2 h-px bg-border" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMode("studio");
                    setMobileOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2 font-mono text-sm ${
                    mode === "studio" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  Studio
                </button>
                <button
                  onClick={() => {
                    setMode("terminal");
                    setMobileOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2 font-mono text-sm ${
                    mode === "terminal" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  Terminal
                </button>
              </div>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-foreground px-4 py-2 text-center font-mono text-sm font-medium text-background"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
