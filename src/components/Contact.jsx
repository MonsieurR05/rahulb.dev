import { contact, profile } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import { CopyEmailButton, ShortcutHint } from "./Widgets";
import { ArrowUpRight } from "./Icons";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="scroll-mt-20 pt-20 sm:pt-28">
      <div className="shell @container">
        <SectionHeading index="05" title="Contact" />

        <div className="reveal mt-10 sm:mt-14">
          <a
            href={`mailto:${contact.email}`}
            className="block w-fit break-words text-[clamp(1.25rem,7.5cqi,6rem)] font-semibold leading-none tracking-[-0.04em] underline decoration-line-strong decoration-2 underline-offset-[0.14em] transition-colors hover:decoration-fg sm:[font-stretch:110%]"
          >
            {contact.email}
          </a>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {contact.availability}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CopyEmailButton email={contact.email} />
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

        <footer className="mt-24 flex flex-col gap-3 border-t border-line py-8 text-sm text-subtle sm:mt-32 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p className="hidden items-center gap-2 sm:flex">
            Built with Next.js and Tailwind CSS · Press <ShortcutHint /> to navigate
          </p>
        </footer>
      </div>
    </section>
  );
}
