import { experience } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading index="03" title="Experience" meta="education and work" />

        <ol className="mt-6 sm:mt-10">
          {experience.map((item, index) => (
            <li
              key={item.id}
              className={`reveal grid gap-6 py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-12 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1.5">
                <p className="font-mono text-sm">{item.date}</p>
                <p className="font-mono text-xs text-subtle">{item.type}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight [font-stretch:110%] sm:text-3xl">
                  {item.role}
                </h3>
                <p className="mt-2 text-muted">
                  {item.organisation} · {item.location}
                </p>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">{item.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-fg/85">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-subtle" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
