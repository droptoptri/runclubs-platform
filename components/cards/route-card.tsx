import type { RouteRecord } from '@/lib/types';
import { formatDistance } from '@/lib/utils';

export function RouteCard({ route }: { route: RouteRecord }) {
  const distance = formatDistance(route.distanceKm ?? undefined);
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold">{route.title}</h3>
      <p className="text-sm text-ink/60">{route.city ?? 'Город уточняется'}</p>
      <div className="mt-auto flex flex-wrap gap-2 text-sm text-ink/70">
        {distance ? <span className="rounded-full bg-ink/5 px-3 py-1">{distance}</span> : null}
        {route.surface ? <span className="rounded-full bg-ink/5 px-3 py-1">{route.surface}</span> : null}
      </div>
    </article>
  );
}
