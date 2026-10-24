import { Fragment } from "react";
import { profile, publications } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight } from "./Icons";

function Authors({ authors }) {
  return authors.map((author, index) => (
    <Fragment key={author}>
      {index > 0 && ", "}
      {author === profile.name ? (
        <span className="font-medium text-fg">{author}</span>
      ) : (
        author
      )}
    </Fragment>
  ));
}

export default function Publications() {
  return (
    <section id="publications" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          index="04"
          title="Publications"
          meta={`${publications.length} paper${publications.length === 1 ? "" : "s"}`}
        />

        <ol className="mt-6 sm:mt-10">
          {publications.map((paper, index) => (
            <li
              key={paper.doi}
              className={`reveal grid gap-6 py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-12 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="flex items-baseline gap-3 md:flex-col md:gap-1.5">
                <p className="font-mono text-sm">{paper.venueShort}</p>
                <p className="font-mono text-xs text-subtle">{paper.role}</p>
              </div>

              <div>
                <h3 className="text-balance text-2xl font-semibold tracking-tight [font-stretch:110%] sm:text-3xl">
                  {paper.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <Authors authors={paper.authors} />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-subtle">
                  {paper.venue}, pp. {paper.pages}. {paper.publisher}, {paper.year}.
                </p>
                <p className="mt-5 max-w-2xl leading-relaxed text-muted">{paper.summary}</p>

                {paper.contribution && (
                  <div className="mt-5 max-w-2xl border-l-2 border-line-strong pl-4">
                    <p className="font-mono text-xs text-subtle">My part</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg/85">{paper.contribution}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={paper.links.paper}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-sm bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
                  >
                    Read the paper
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href={paper.links.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                  >
                    PDF
                    <ArrowUpRight className="size-3.5" />
                  </a>
                  <p className="font-mono text-xs text-subtle">DOI {paper.doi}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
