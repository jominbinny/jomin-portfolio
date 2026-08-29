import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/lib/context";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { setMode } = usePortfolio();

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Home",
      description: "Go to homepage",
      shortcut: "H",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "about",
      label: "About",
      description: "About section",
      shortcut: "A",
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "projects",
      label: "Projects",
      description: "View projects",
      shortcut: "P",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "skills",
      label: "Stack",
      description: "Tech stack & skills",
      shortcut: "S",
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work experience",
      shortcut: "E",
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      shortcut: "C",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
      category: "Navigation",
    },
    {
      id: "terminal",
      label: "Terminal Mode",
      description: "Switch to terminal interface",
      shortcut: "T",
      action: () => setMode("terminal"),
      category: "Mode",
    },
    {
      id: "studio",
      label: "Studio Mode",
      description: "Switch to visual interface",
      shortcut: "V",
      action: () => setMode("studio"),
      category: "Mode",
    },
    {
      id: "github",
      label: "GitHub Profile",
      description: "Open GitHub in new tab",
      action: () => window.open("https://github.com/jominbinny", "_blank"),
      category: "External",
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      description: "Open LinkedIn in new tab",
      action: () => window.open("https://linkedin.com/in/jominbinny", "_blank"),
      category: "External",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Open resume PDF",
      action: () => window.open("/Jomin_Binny_Resume.pdf", "_blank"),
      category: "External",
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  const executeCommand = useCallback((cmd: CommandItem) => {
    cmd.action();
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.children[selectedIndex] as HTMLElement;
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setQuery("");
              setSelectedIndex(0);
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[15%] left-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center border-b border-border px-4">
              <svg
                className="h-4 w-4 shrink-0 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder-muted-foreground"
              />
              <kbd className="ml-2 shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[300px] overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No commands found
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{cmd.label}</div>
                      <div className="text-xs text-muted-foreground">{cmd.description}</div>
                    </div>
                    {cmd.shortcut && (
                      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <div className="flex gap-2 text-[10px] text-muted-foreground">
                <span>
                  <kbd className="mr-1 rounded border border-border bg-muted px-1 py-0.5 font-mono">
                    ↑↓
                  </kbd>{" "}
                  navigate
                </span>
                <span>
                  <kbd className="mr-1 rounded border border-border bg-muted px-1 py-0.5 font-mono">
                    ↵
                  </kbd>{" "}
                  select
                </span>
                <span>
                  <kbd className="mr-1 rounded border border-border bg-muted px-1 py-0.5 font-mono">
                    esc
                  </kbd>{" "}
                  close
                </span>
              </div>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
