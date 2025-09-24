import type { ReactNode } from 'react';

export function Section({
  title,
  description,
  children,
  className
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="mt-2 text-sm text-ink/70">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
