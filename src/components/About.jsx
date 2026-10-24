import { contact, experience, profile, projects, skills } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { LondonClock } from "./Widgets";
import { ArrowRight, ArrowUpRight } from "./Icons";

const education = experience.find((item) => item.type === "Education");

// Degree timeline, assuming a September start and June finish.
const [startYear, endYear] = (education?.date.match(/\d{4}/g) ?? []).map(Number);
const degreeProgress = Math.min(
  1,
  Math.max(
    0,
    (Date.now() - Date.UTC(startYear, 8, 1)) /
      (Date.UTC(endYear, 5, 30) - Date.UTC(startYear, 8, 1))
  )
);

// Skills that appear in a project's tech list count as shown, not just claimed.
// Names are compared without spaces or case, so "TailwindCSS" matches "Tailwind CSS".
const normalise = (name) => name.toLowerCase().replace(/\s+/g, "");
const usedInProjects = new Set(
  projects.flatMap((project) => project.tech.map(normalise))
);

const practices = [
  "Small, focused commits in a type[area]: message format",
  "Architecture, testing and design decisions written down as I go",
  "Changes driven by user feedback, logged with what changed and why",
];

const practicesEvidence = "https://github.com/MonsieurR05/quantique-exchange/tree/main/docs";

// Cells share hairline borders, so the grid reads as one table rather than floating cards.
function Cell({ label, className = "", children }) {
  return (
    <div className={`reveal flex flex-col border-b border-r border-line p-6 sm:p-8 ${className}`}>
      <p className="font-mono text-xs text-subtle">{label}</p>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading index="01" title="About" meta="London, UK" />

        <div className="mt-10 grid border-l border-t border-line sm:mt-14 md:grid-cols-6">
          <Cell label="What I do" className="md:col-span-4 md:row-span-2">
            <ul className="mt-4 flex-1 divide-y divide-line">
              {profile.focusAreas.map((area, index) => (
                <li
                  key={area}
                  className="flex items-baseline gap-5 py-4 text-xl font-medium tracking-tight sm:text-2xl"
                >
                  <span className="font-mono text-xs text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </Cell>

          <Cell label="Local time, London" className="md:col-span-2">
            <div className="mt-6">
              <LondonClock />
            </div>
            <p className="mt-auto pt-6 text-sm text-muted">
              Based in London, UK. Happy to work across time zones.
            </p>
          </Cell>

          {education && (
            <Cell label="Education" className="md:col-span-2">
              <p className="mt-6 text-lg font-medium tracking-tight">BSc Computer Science</p>
              <p className="mt-1 text-sm text-muted">{education.organisation}</p>
              <div className="mt-auto pt-6">
                <div className="h-1 bg-line">
                  <div
                    className="h-full bg-fg"
                    style={{ width: `${Math.round(degreeProgress * 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[11px] text-subtle">
                  <span>{startYear}</span>
                  <span>{endYear}</span>
                </div>
              </div>
            </Cell>
          )}

          <Cell label="How I work" className="md:col-span-3">
            <ul className="mt-6 space-y-3">
              {practices.map((practice) => (
                <li key={practice} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-subtle" />
                  {practice}
                </li>
              ))}
            </ul>
            <a
              href={practicesEvidence}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-1 pt-6 text-sm text-muted transition-colors hover:text-fg"
            >
              See the Quantique Exchange docs
              <ArrowUpRight className="size-3.5" />
            </a>
          </Cell>

          <Cell label="Availability" className="md:col-span-3">
            <p className="mt-6 text-lg leading-snug tracking-tight">{contact.availability}</p>
            <a
              href="#contact"
              className="group mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
            >
              Get in touch
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Cell>

          <Cell label="Toolkit" className="md:col-span-6">
            <p className="mt-2 text-sm text-muted">
              Highlighted skills are the ones used in the projects below.
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((group) => {
                const used = group.items.filter((item) => usedInProjects.has(normalise(item)));
                const other = group.items.filter((item) => !usedInProjects.has(normalise(item)));

                return (
                  <div key={group.category}>
                    <p className="text-sm font-medium">{group.category}</p>
                    {used.length > 0 && (
                      <p className="mt-2 text-sm leading-relaxed text-fg">{used.join(", ")}</p>
                    )}
                    {other.length > 0 && (
                      <p className="mt-1 text-sm leading-relaxed text-subtle">
                        {used.length > 0 && "Also "}
                        {other.join(", ")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}
