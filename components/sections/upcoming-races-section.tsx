'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { RaceCard } from '@/components/cards/race-card';
import { Loader } from '@/components/ui/loader';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { RaceRecord } from '@/lib/types';

export function UpcomingRacesSection() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['races', value], async () => {
    const response = await fetchRecords<RaceRecord>('races', cityName ?? undefined, {
      sort: 'date'
    });
    return response.list;
  });

  const races = useMemo(() => {
    if (!data) return [];
    const filtered = filterByCitySelection(data, value);
    return [...filtered].sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : Number.MAX_SAFE_INTEGER;
      const bTime = b.date ? new Date(b.date).getTime() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });
  }, [data, value]);

  return (
    <Section title="Ближайшие забеги" description="Собираемся на старты в вашем городе">
      {isLoading ? <Loader /> : null}
      {error ? <EmptyState title="Не удалось загрузить забеги" description="Попробуйте обновить страницу." /> : null}
      {!isLoading && !error ? (
        races.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {races.map((race) => (
              <RaceCard key={race.id} race={race} />
            ))}
          </ul>
        ) : (
          <EmptyState title="Забегов пока нет" description="Следите за обновлениями афиши." />
        )
      ) : null}
    </Section>
  );
}
