import type { RaceRecord } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function RaceCard({ race }: { race: RaceRecord }) {
  return (
    <li className="flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-ink/60">{race.city ?? 'Город уточняется'}</p>
        <h3 className="text-lg font-semibold">{race.title}</h3>
      </div>
      <p className="text-sm font-medium text-ink/80">{formatDate(race.date)}</p>
    </li>
  );
}
