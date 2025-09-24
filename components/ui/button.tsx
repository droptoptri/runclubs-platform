'use client';

import { forwardRef, isValidElement, cloneElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'ghost' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/50 disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-accentBlue text-white hover:bg-accentBlue/90',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ink/30 shadow-soft'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', asChild, children, type = 'button', ...props },
  ref
) {
  const classes = clsx(baseStyles, variantStyles[variant], className);

  if (asChild && isValidElement(children)) {
    const { type: _type, ...restProps } = props;
    return cloneElement(children as ReactElement, {
      ...restProps,
      className: clsx((children as ReactElement).props.className, classes)
    });
  }

  return (
    <button ref={ref} className={classes} type={type} {...props}>
      {children}
    </button>
  );
});
