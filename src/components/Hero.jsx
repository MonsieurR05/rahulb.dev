import { contact, profile } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight } from "./Icons";

// Each line is a list of [token type, text] pairs for the profile.json card.
const codeLines = [
  [["p", "{"]],
  [["k", '  "name"'], ["p", ": "], ["s", `"${profile.name}"`], ["p", ","]],
  [["k", '  "role"'], ["p", ": "], ["s", '"Software Developer"'], ["p", ","]],
  [["k", '  "study"'], ["p", ": "], ["s", '"BSc CS, UAL"'], ["p", ","]],
  [["k", '  "based"'], ["p", ": "], ["s", '"London, UK"'], ["p", ","]],
  [["k", '  "latest"'], ["p", ": "], ["s", '"Quantique Exchange"'], ["p", ","]],
  [
    ["k", '  "stack"'],
    ["p", ": ["],
    ["s", '"React"'],
    ["p", ", "],
    ["s", '"Next.js"'],
    ["p", ", "],
    ["s", '"Python"'],
    ["p", "],"],
  ],
  [["k", '  "published"'], ["p", ": "], ["s", "\"ACM C&C '25\""], ["p", ","]],
  [["k", '  "open_to"'], ["p", ": "], ["s", '"graduate roles"']],
  [["p", "}"]],
];

const tokenClass = {
  k: "text-fg",
  s: "text-muted",
  p: "text-subtle",
};

export default function Hero() {
  return (
    <section id="top" className="pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="shell @container">
        <p className="enter flex items-start gap-2.5 text-sm text-muted">
          <span className="mt-[7px] size-1.5 shrink-0 bg-fg" />
          Open to graduate software engineering roles and internships
        </p>

        <h1
          className="enter mt-6 text-[clamp(3.75rem,13.5cqi,9.5rem)] font-bold leading-[0.9] tracking-[-0.045em] [font-stretch:112%]"
          style={{ "--d": "60ms" }}
        >
          Rahul <br className="sm:hidden" />
          Bagga
        </h1>

        <div
          className="enter mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-2 lg:gap-16"
          style={{ "--d": "140ms" }}
        >
          <div>
            <p className="text-xl font-medium tracking-tight sm:text-2xl">
              {profile.title}, based in London.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#work"
                className="group inline-flex h-11 items-center gap-2 rounded-sm bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
              >
                View my work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="text-sm font-medium underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
              >
                Get in touch
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
              >
                GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          <CodeCard />
        </div>
      </div>
    </section>
  );
}

function CodeCard() {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
        <span>~/rahul/profile.json</span>
        <span>json</span>
      </div>

      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 sm:text-[13px] sm:leading-7">
        <code>
          {codeLines.map((tokens, line) => (
            <span key={line} className="flex">
              <span className="mr-5 hidden w-4 select-none text-right text-subtle/50 sm:inline-block">
                {line + 1}
              </span>
              <span className="whitespace-pre">
                {tokens.map(([type, text], i) => (
                  <span key={i} className={tokenClass[type]}>
                    {text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
