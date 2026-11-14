interface Props {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: Props) {
  return (
    <div className="mb-16">
      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
      <h2 className="font-heading text-[1.25rem] tracking-wide text-foreground sm:text-[1.5rem] md:text-[1.75rem]">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
