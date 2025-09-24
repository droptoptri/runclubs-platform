import { Badge } from '@/components/ui/badge';
import type { WorkoutRecord } from '@/lib/types';
import { formatDateWithWeekday, formatDistance, formatPace } from '@/lib/utils';

export function WorkoutCard({ workout }: { workout: WorkoutRecord }) {
  const date = formatDateWithWeekday(workout.date);
  const distance = formatDistance(workout.distanceKm ?? undefined);
  const pace = formatPace(workout.paceMin ?? undefined, workout.paceMax ?? undefined);

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-sm text-ink/60">
        <span className="font-semibold text-ink">{date}</span>
        {workout.city ? <span>· {workout.city}</span> : null}
        {workout.isOpen ? <Badge className="bg-accent/30 text-xs text-ink">Открыта</Badge> : null}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{workout.title ?? 'Совместная тренировка'}</h3>
        {workout.clubName ? <p className="text-sm text-ink/70">{workout.clubName}</p> : null}
        {workout.location ? <p className="text-sm text-ink/70">{workout.location}</p> : null}
      </div>
      <div className="mt-auto flex flex-wrap gap-3 text-sm text-ink/70">
        {distance ? <span className="rounded-full bg-ink/5 px-3 py-1">{distance}</span> : null}
        {pace ? <span className="rounded-full bg-ink/5 px-3 py-1">{pace}</span> : null}
      </div>
    </article>
  );
}
