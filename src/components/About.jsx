import { contact, experience, profile, projects, skills } from "@/data/portfolio";
import { tracePoints } from "@/lib/trace";
import SectionHeading from "./SectionHeading";
import { LondonClock, OpenProjectButton } from "./Widgets";
import { ArrowRight } from "./Icons";

const education = experience.find((item) => item.type === "Education");
const featured = projects[0];

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

const sparkline = tracePoints({ seed: 1.2, amplitude: 10, width: 280, base: 24, offset: 0 });

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
        <SectionHeading index="03" title="About" meta="London, UK" />

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

          {featured && (
            <Cell label="Featured project" className="md:col-span-3">
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold tracking-tight [font-stretch:110%]">
                    {featured.title}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {featured.tech.slice(0, 3).join(" / ")}
                  </p>
                </div>
                <span className="font-mono text-xs text-subtle">{featured.status}</span>
              </div>
              <svg viewBox="0 0 280 48" className="mt-6 h-auto w-full" aria-hidden>
                <polyline
                  className="draw"
                  pathLength="1"
                  points={sparkline}
                  fill="none"
                  stroke="var(--fg)"
                  strokeOpacity="0.8"
                  strokeWidth="1.25"
                />
              </svg>
              <div className="mt-6">
                <OpenProjectButton slug={featured.slug}>Read the case study</OpenProjectButton>
              </div>
            </Cell>
          )}

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
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="text-sm font-medium">{group.category}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {group.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}
