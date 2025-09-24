'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { ClubCard } from '@/components/cards/club-card';
import { Loader } from '@/components/ui/loader';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { ClubRecord } from '@/lib/types';

export function TopClubsSection() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['clubs', value], async () => {
    const response = await fetchRecords<ClubRecord>('clubs', cityName ?? undefined);
    return response.list;
  });

  const clubs = useMemo(() => {
    if (!data) return [];
    return filterByCitySelection(data, value).slice(0, 6);
  }, [data, value]);

  return (
    <Section title="Топ клубов города" description="Отобранные комьюнити и проверенные тренеры">
      {isLoading ? <Loader /> : null}
      {error ? <EmptyState title="Не удалось загрузить клубы" description="Обновите страницу и попробуйте снова." /> : null}
      {!isLoading && !error ? (
        clubs.length > 0 ? (
          <div className="section-grid">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <EmptyState title="Клубы не найдены" description="Добавьте свой клуб через форму ниже." />
        )
      ) : null}
    </Section>
  );
}
