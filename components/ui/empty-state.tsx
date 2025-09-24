import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

type EmptyStateComponent = ((props: EmptyStateProps) => JSX.Element) & {
  ActionButton: typeof Button;
};

const EmptyStateBase = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/10 bg-white/60 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-ink/70">{description}</p> : null}
      {action}
    </div>
  );
};

export const EmptyState = EmptyStateBase as EmptyStateComponent;

EmptyState.ActionButton = Button;
