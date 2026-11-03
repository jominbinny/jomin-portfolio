import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, personalInfo } from "@/lib/data";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const item of navItems) {
        const element = document.getElementById(item.href.slice(1));
        if (element && element.getBoundingClientRect().top <= 130) current = item.href.slice(1);
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`reference-navbar fixed z-50 transition-all ${
        scrolled ? "reference-navbar--scrolled" : ""
      }`}
    >
      <div className="reference-navbar__inner mx-auto flex max-w-7xl items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="reference-brand transition-opacity hover:opacity-70"
          aria-label="Scroll to top"
        >
          <svg aria-hidden="true" className="reference-brand__mark" viewBox="0 0 28 20" fill="none">
            <path d="M3 10c0-3.7 3-6.7 6.7-6.7h7.6c3.7 0 6.7 3 6.7 6.7s-3 6.7-6.7 6.7H9.7C6 16.7 3 13.7 3 10Z" />
            <path d="M1 10c0-2.2 1.8-4 4-4h10.3c2.2 0 4 1.8 4 4s-1.8 4-4 4H5c-2.2 0-4-1.8-4-4Z" />
          </svg>
          <span>Jomin</span>
        </button>

        <div className="reference-navbar__links hidden items-center md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`reference-nav-link transition-colors ${
                activeSection === item.href.slice(1) ? "reference-nav-link--active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-resume transition-transform hover:-translate-y-0.5"
          >
            Work with me
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="reference-menu flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
          <span className="h-px w-5 bg-foreground" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="reference-mobile-menu overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-start gap-4 px-5 py-5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="reference-nav-link"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-resume mt-2"
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
