import { profile, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";

export type CommandAction =
  | { type: "clear" }
  | { type: "exit" }
  | { type: "openUrl"; url: string }
  | { type: "theme"; phosphor?: "green" | "amber" };

export type CommandResult = {
  lines: string[];
  action?: CommandAction;
};

export type CommandHandler = (args: string[]) => CommandResult;

const githubHref =
  socials.find((s) => s.label === "GitHub")?.href ?? "https://github.com/kimrolx";
const emailSocial = socials.find((s) => s.label === "Email");
const emailHref = emailSocial?.href ?? "mailto:beramekimrol@gmail.com";
const emailAddr = emailSocial?.handle ?? "beramekimrol@gmail.com";

function projectUrl(p: (typeof projects)[number]): string {
  return p.links[0]?.href ?? githubHref;
}

const PUBLIC_COMMANDS: { name: string; desc: string }[] = [
  { name: "help", desc: "list commands" },
  { name: "about", desc: "who is Kim" },
  { name: "whoami", desc: "who are you" },
  { name: "projects", desc: "featured work" },
  { name: "experience", desc: "work history" },
  { name: "skills", desc: "tech stack" },
  { name: "socials", desc: "find me online" },
  { name: "contact", desc: "get in touch" },
  { name: "open <n>", desc: "open project #n" },
  { name: "theme", desc: "green | amber" },
  { name: "clear", desc: "clear screen" },
  { name: "exit", desc: "leave CRT mode" },
];

export const commands: Record<string, CommandHandler> = {
  help: () => ({
    lines: [
      "available commands:",
      "",
      ...PUBLIC_COMMANDS.map((c) => `  ${c.name.padEnd(12)} ${c.desc}`),
      "",
      "(some commands are hidden. poke around.)",
    ],
  }),
  about: () => ({
    lines: [
      profile.name,
      `${profile.role} · ${profile.location}`,
      `${profile.education.degree}, ${profile.education.school}`,
      "",
      ...profile.about,
    ],
  }),
  whoami: () => ({
    lines: ["visitor — but you found the terminal, so: certified curious dev."],
  }),
  projects: () => ({
    lines: [
      "projects:",
      "",
      ...projects.map(
        (p, i) => `  [${i + 1}] ${p.title} — ${p.kind} · ${p.status}`,
      ),
      "",
      "type 'open <n>' to visit a project.",
    ],
  }),
  experience: () => ({
    lines: [
      "experience:",
      "",
      ...experiences.map((e) => `  ${e.company} — ${e.role} · ${e.period}`),
    ],
  }),
  skills: () => ({
    lines: [
      "skills:",
      "",
      ...skillGroups.map((g) => `  ${g.category}: ${g.items.join(", ")}`),
    ],
  }),
  socials: () => ({
    lines: [
      "socials:",
      "",
      ...socials.map((s) => `  ${s.label.padEnd(10)} ${s.handle}  ${s.href}`),
    ],
  }),
  contact: () => ({
    lines: [`email: ${emailAddr}`, "type 'email' to open your mail client."],
  }),
  email: () => ({
    lines: [`opening ${emailAddr}...`],
    action: { type: "openUrl", url: emailHref },
  }),
  github: () => ({
    lines: ["opening GitHub..."],
    action: { type: "openUrl", url: githubHref },
  }),
  resume: () => ({
    lines: ["opening resume..."],
    action: { type: "openUrl", url: profile.resumeUrl },
  }),
  cv: () => commands.resume([]),
  open: (args) => {
    if (!args[0]) {
      return { lines: ["usage: open <n> — run 'projects' to see the numbers."] };
    }
    const n = parseInt(args[0], 10);
    if (!Number.isFinite(n) || n < 1 || n > projects.length) {
      return { lines: [`no project #${args[0]}. type 'projects'.`] };
    }
    const p = projects[n - 1];
    return {
      lines: [`opening ${p.title}...`],
      action: { type: "openUrl", url: projectUrl(p) },
    };
  },
  clear: () => ({ lines: [], action: { type: "clear" } }),
  theme: (args) => {
    const arg = (args[0] ?? "").toLowerCase();
    if (arg === "amber" || arg === "green") {
      return {
        lines: [`phosphor set to ${arg}.`],
        action: { type: "theme", phosphor: arg },
      };
    }
    if (arg === "") {
      return { lines: ["toggling phosphor..."], action: { type: "theme" } };
    }
    return { lines: ["usage: theme [green|amber]"] };
  },
  exit: () => ({ lines: ["powering down..."], action: { type: "exit" } }),
  // hidden (not listed in help)
  sudo: (args) => {
    if (args.join(" ") === "rm -rf /") {
      return { lines: ["denied. you can't delete what you came to admire."] };
    }
    return { lines: ["nice try. this is a portfolio, not a root shell."] };
  },
  ls: () => ({
    lines: ["about  projects  experience  skills  socials  secrets/  .hire"],
  }),
  hire: () => ({
    lines: ["smart move. let's talk —", `  ${emailAddr}`],
    action: { type: "openUrl", url: emailHref },
  }),
};

export function runCommand(raw: string): CommandResult {
  const parts = raw.trim().split(/\s+/);
  const name = (parts[0] ?? "").toLowerCase();
  const args = parts.slice(1);
  if (name === "") return { lines: [] };
  const handler = commands[name];
  if (!handler) {
    return { lines: [`command not found: ${name}. type 'help' for a list.`] };
  }
  return handler(args);
}
