export default function SectionHeading({ index, title, meta, description }) {
  return (
    <div className="reveal">
      <div className="flex items-baseline justify-between gap-6 border-t border-line pt-5">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] [font-stretch:110%] sm:text-4xl">
          {title}
        </h2>
        <p className="shrink-0 font-mono text-xs text-subtle">
          {index}
          {meta && <span className="hidden sm:inline"> — {meta}</span>}
        </p>
      </div>
      {description && (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
