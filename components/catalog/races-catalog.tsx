'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { RaceCard } from '@/components/cards/race-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Loader } from '@/components/ui/loader';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { RaceRecord } from '@/lib/types';

export function RacesCatalog() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['races-catalog', value], async () => {
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState title="Не удалось загрузить забеги" description="Попробуйте обновить страницу позже." />;
  }

  if (races.length === 0) {
    return <EmptyState title="Забегов пока нет" description="Следите за обновлениями календаря." />;
  }

  return (
    <ul className="flex flex-col gap-4">
      {races.map((race) => (
        <RaceCard key={race.id} race={race} />
      ))}
    </ul>
  );
}
