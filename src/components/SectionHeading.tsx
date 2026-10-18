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
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
