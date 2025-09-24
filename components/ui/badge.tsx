import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full bg-ink/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink/70',
        className
      )}
      {...props}
    />
  );
}
