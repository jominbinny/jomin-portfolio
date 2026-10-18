import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  personalInfo,
  aboutText,
  skills,
  projects,
  experience,
  leadership,
  quickFacts,
} from "@/lib/data";

interface TerminalLine {
  type: "input" | "output";
  text: string;
  html?: string;
}

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "leadership",
  "github",
  "contact",
  "clear",
  "whoami",
  "ls",
  "pwd",
  "echo",
  "date",
  "history",
];

function processCommand(input: string): TerminalLine[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  switch (cmd) {
    case "help":
      return [
        { type: "output", text: "Available commands:\n" },
        {
          type: "output",
          text: COMMANDS.map((c) => `  ${c}`).join("\n"),
        },
        { type: "output", text: "\nType a command and press Enter." },
      ];

    case "about":
      return [
        { type: "output", text: "ABOUT" },
        { type: "output", text: "─".repeat(50) },
        ...aboutText.map((t) => ({ type: "output" as const, text: t })),
        { type: "output", text: "" },
        {
          type: "output",
          text: quickFacts.map((f) => `${f.label}: ${f.value}`).join("\n"),
        },
      ];

    case "projects":
      if (args === "--detail") {
        return projects.flatMap((p, i) => [
          {
            type: "output" as const,
            text: `${"═".repeat(50)}\nPROJECT ${String(i + 1).padStart(2, "0")} — ${p.title.toUpperCase()}\n${"═".repeat(50)}`,
          },
          { type: "output" as const, text: `\n${p.description}\n` },
          {
            type: "output" as const,
            text: `PROBLEM\n${p.problem}\n`,
          },
          {
            type: "output" as const,
            text: `TECH STACK\n${p.tech.join(" / ")}\n`,
          },
          {
            type: "output" as const,
            text: `RESULT\n${p.result}\n`,
          },
        ]);
      }
      return [
        { type: "output", text: "PROJECTS" },
        { type: "output", text: "─".repeat(50) },
        ...projects.flatMap((p, i) => [
          {
            type: "output" as const,
            text: `${String(i + 1).padStart(2, "0")}  ${p.title.toUpperCase()}`,
          },
          {
            type: "output" as const,
            text: `    ${p.tech.join(" · ")}`,
          },
          { type: "output" as const, text: "" },
        ]),
        { type: "output", text: "Run 'projects --detail' for case studies." },
      ];

    case "skills":
      return [
        { type: "output", text: "SKILLS" },
        { type: "output", text: "─".repeat(50) },
        ...Object.entries(skills).flatMap(([cat, items]) => [
          { type: "output" as const, text: `\n${cat.toUpperCase()}` },
          {
            type: "output" as const,
            text: items.map((s) => `  ${s}`).join("\n"),
          },
        ]),
      ];

    case "experience":
      return [
        { type: "output", text: "EXPERIENCE" },
        { type: "output", text: "─".repeat(50) },
        ...experience.flatMap((e) => [
          {
            type: "output" as const,
            text: `${e.company} — ${e.role}`,
          },
          { type: "output" as const, text: `  ${e.period}` },
          { type: "output" as const, text: `  ${e.description}` },
          {
            type: "output" as const,
            text: `  [${e.highlights.join(" | ")}]`,
          },
          { type: "output" as const, text: "" },
        ]),
      ];

    case "education":
      return [
        { type: "output", text: "EDUCATION" },
        { type: "output", text: "─".repeat(50) },
        { type: "output", text: "" },
        {
          type: "output",
          text: "B.Tech Computer Science Engineering\nCollege of Engineering Vadakara\nCGPA: 8.20",
        },
      ];

    case "leadership":
      return [
        { type: "output", text: "LEADERSHIP" },
        { type: "output", text: "─".repeat(50) },
        ...leadership.flatMap((l) => [
          { type: "output" as const, text: `${l.title}` },
          { type: "output" as const, text: `  ${l.period}` },
          { type: "output" as const, text: `  ${l.description}` },
          {
            type: "output" as const,
            text: `  [${l.stats.join(" | ")}]`,
          },
          { type: "output" as const, text: "" },
        ]),
      ];

    case "github":
      return [
        { type: "output", text: "GITHUB" },
        { type: "output", text: "─".repeat(50) },
        {
          type: "output",
          text: `Profile: ${personalInfo.github}`,
        },
        {
          type: "output",
          text: "Opening GitHub profile in a new tab...",
        },
      ];

    case "contact":
      return [
        { type: "output", text: "CONTACT" },
        { type: "output", text: "─".repeat(50) },
        { type: "output", text: `Email:   ${personalInfo.email}` },
        {
          type: "output",
          text: `GitHub:  ${personalInfo.github}`,
        },
        {
          type: "output",
          text: `LinkedIn: ${personalInfo.linkedin}`,
        },
        { type: "output", text: `Location: ${personalInfo.location}` },
      ];

    case "whoami":
      return [
        {
          type: "output",
          text: `${personalInfo.name} — ${personalInfo.role}`,
        },
        { type: "output", text: personalInfo.location },
      ];

    case "ls":
      return [
        {
          type: "output",
          text: "about/  projects/  skills/  experience/  education/  contact/",
        },
      ];

    case "pwd":
      return [{ type: "output", text: "/home/jomin/portfolio" }];

    case "echo":
      return [{ type: "output", text: args || "" }];

    case "date":
      return [{ type: "output", text: new Date().toString() }];

    case "history":
      return [{ type: "output", text: "Command history is shown above." }];

    case "clear":
      return [{ type: "output", text: "__CLEAR__" }];

    case "sudo":
      if (args.toLowerCase() === "hire-jomin") {
        return [
          { type: "output", text: "Checking compatibility..." },
          { type: "output", text: "" },
          { type: "output", text: "✓ Computer Science background" },
          { type: "output", text: "✓ Builds real projects" },
          { type: "output", text: "✓ Leads technical communities" },
          { type: "output", text: "✓ Full-stack capabilities" },
          { type: "output", text: "✓ Problem solver" },
          { type: "output", text: "" },
          { type: "output", text: "STATUS: WORTH A CONVERSATION" },
          { type: "output", text: "" },
          {
            type: "output",
            text: `Contact: ${personalInfo.email}`,
          },
        ];
      }
      return [
        {
          type: "output",
          text: `sudo: ${args || "unknown"} — nice try, but this isn't that kind of terminal.`,
        },
      ];

    default:
      return [
        {
          type: "output",
          text: `command not found: ${cmd}. Type 'help' for available commands.`,
        },
      ];
  }
}

function matchCommand(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;
  const matches = COMMANDS.filter((c) => c.startsWith(trimmed));
  if (matches.length === 1) return matches[0];
  return null;
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      text: `Welcome to ${personalInfo.firstName}'s portfolio terminal.`,
    },
    { type: "output", text: "Type 'help' for available commands.\n" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const output = processCommand(trimmed);

    if (output.some((l) => l.text === "__CLEAR__")) {
      setLines([
        {
          type: "output",
          text: `Welcome to ${personalInfo.firstName}'s portfolio terminal.`,
        },
        { type: "output", text: "Type 'help' for available commands.\n" },
      ]);
    } else {
      setLines((prev) => [...prev, { type: "input", text: trimmed }, ...output]);
    }

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");
    setSuggestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    const match = matchCommand(val);
    setSuggestion(match && match !== val.toLowerCase() ? match : "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden bg-[oklch(0.10_0.015_60)] text-[oklch(0.88_0.01_145)]"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-[oklch(0.22_0.015_60)] px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[oklch(0.55_0.20_25)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.82_0.15_85)]" />
          <div className="h-3 w-3 rounded-full bg-[oklch(0.75_0.15_145)]" />
        </div>
        <span className="ml-2 font-mono text-xs text-[oklch(0.50_0.02_145)]">jomin@portfolio:~</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="select-none text-[oklch(0.75_0.15_145)]">jomin@portfolio:~$</span>
                <span>{line.text}</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-[oklch(0.80_0.01_145)]">{line.text}</div>
            )}
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="select-none text-[oklch(0.75_0.15_145)]">jomin@portfolio:~$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent font-mono text-sm text-[oklch(0.88_0.01_145)] outline-none"
              autoFocus
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {suggestion && (
              <span className="pointer-events-none absolute left-0 top-0 font-mono text-sm text-[oklch(0.40_0.02_145)]">
                {suggestion}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Quick commands bar */}
      <div className="flex flex-wrap gap-2 border-t border-[oklch(0.22_0.015_60)] px-4 py-2">
        {["about", "projects", "skills", "experience", "contact", "help"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="rounded bg-[oklch(0.16_0.015_60)] px-2 py-0.5 font-mono text-xs text-[oklch(0.60_0.02_145)] transition-colors hover:bg-[oklch(0.20_0.015_60)] hover:text-[oklch(0.80_0.01_145)]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
