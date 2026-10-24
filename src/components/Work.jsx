"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { ArrowRight, ArrowUpRight, Close } from "./Icons";

const isUrl = (value) => typeof value === "string" && value.startsWith("http");

export default function Work() {
  const [openSlug, setOpenSlug] = useState(null);
  const dialogRef = useRef(null);
  const project = projects.find((item) => item.slug === openSlug);

  useEffect(() => {
    function handleOpen(event) {
      setOpenSlug(event.detail?.slug ?? null);
    }
    window.addEventListener("rahul:project", handleOpen);
    return () => window.removeEventListener("rahul:project", handleOpen);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          index="01"
          title="Projects"
          meta={`${projects.length} projects`}
          description="Full-stack and data-driven web projects, from a live IoT trading simulator to this site."
        />

        <div className="mt-10 space-y-6 sm:mt-14">
          {projects.map((item, index) => (
            <ProjectCard
              key={item.slug}
              project={item}
              index={index}
              onOpen={() => setOpenSlug(item.slug)}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="case-dialog"
        aria-labelledby="case-study-title"
        onClose={() => setOpenSlug(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {project && <CaseStudy project={project} onClose={() => dialogRef.current?.close()} />}
      </dialog>
    </section>
  );
}

function Status({ status }) {
  const live = status.toLowerCase().includes("development");
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
      <span className={`size-1.5 ${live ? "bg-fg" : "border border-subtle"}`} />
      {status}
    </span>
  );
}

function Screenshot({ image, sizes }) {
  if (!image) return null;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      placeholder="blur"
      className="h-auto w-full rounded-sm border border-line"
    />
  );
}

function Tech({ tech }) {
  return <p className="font-mono text-xs leading-relaxed text-muted">{tech.join(" / ")}</p>;
}

function ProjectCard({ project, index, onOpen }) {
  const flipped = index % 2 === 1;

  return (
    <article className="reveal grid overflow-hidden rounded-sm border border-line bg-surface lg:grid-cols-2">
      <div className={`flex flex-col p-6 sm:p-10 ${flipped ? "lg:order-2" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs text-subtle">
            {String(index + 1).padStart(2, "0")} — {project.type}
          </p>
          <Status status={project.status} />
        </div>

        <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em] [font-stretch:110%] sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">{project.description}</p>

        {project.contribution && (
          <div className="mt-5 max-w-lg border-l-2 border-line-strong pl-4">
            <p className="font-mono text-xs text-subtle">My part</p>
            <p className="mt-1 text-sm leading-relaxed text-fg/85">{project.contribution}</p>
          </div>
        )}

        <div className="mt-6">
          <Tech tech={project.tech} />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-10">
          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex h-11 items-center gap-2 rounded-sm bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            Read case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          {isUrl(project.links?.live) && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
            >
              Live demo
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {isUrl(project.links?.github) && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
            >
              Code
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>

      <div
        className={`flex items-center border-line bg-bg p-6 sm:p-10 ${
          flipped ? "border-b lg:border-b-0 lg:border-r" : "border-t lg:border-l lg:border-t-0"
        }`}
      >
        <Screenshot image={project.image} sizes="(min-width: 1024px) 34rem, 100vw" />
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close case study"
        className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-sm border border-line bg-surface text-muted transition-colors hover:text-fg"
      >
        <Close className="size-4" />
      </button>

      <div className="max-h-[min(90dvh,960px)] overflow-y-auto overscroll-contain">
        <div className="border-b border-line bg-bg px-6 py-8 sm:px-12 sm:py-10">
          <Screenshot image={project.image} sizes="(min-width: 56rem) 50rem, 100vw" />
        </div>

        <div className="px-6 py-8 sm:px-12 sm:py-12">
          <p className="font-mono text-xs text-subtle">{project.type}</p>
          <h2
            id="case-study-title"
            className="mt-2 text-4xl font-semibold tracking-[-0.03em] [font-stretch:110%] sm:text-5xl"
          >
            {project.title}
          </h2>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-5 text-sm">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Status", project.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-xs text-subtle">{label}</dt>
                <dd className="mt-1.5">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 space-y-9">
            <CaseSection title="Problem">
              <p>{project.problem}</p>
            </CaseSection>

            <CaseSection title="Solution">
              <p>{project.solution}</p>
            </CaseSection>

            <CaseSection title="Key features">
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-subtle" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CaseSection>

            {project.contribution && (
              <CaseSection title="My part">
                <p>{project.contribution}</p>
              </CaseSection>
            )}

            {project.decisions && (
              <CaseSection title="Engineering decisions">
                <ul className="space-y-4">
                  {project.decisions.map((decision) => (
                    <li key={decision.title}>
                      <p className="font-medium text-fg">{decision.title}</p>
                      <p className="mt-1">{decision.detail}</p>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            )}

            <CaseSection title="Outcome">
              <p>{project.outcome}</p>
            </CaseSection>

            <CaseSection title="Built with">
              <Tech tech={project.tech} />
            </CaseSection>
          </div>

          {(isUrl(project.links?.github) || isUrl(project.links?.live)) && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
              {isUrl(project.links.github) && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-sm bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
                >
                  View code
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              {isUrl(project.links.live) && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                >
                  Live demo
                  <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CaseSection({ title, children }) {
  return (
    <section className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <h3 className="font-mono text-xs text-subtle sm:pt-1">{title}</h3>
      <div className="leading-relaxed text-muted">{children}</div>
    </section>
  );
}
