'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { ClubCard } from '@/components/cards/club-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Loader } from '@/components/ui/loader';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { ClubRecord } from '@/lib/types';

const clubFormUrl = process.env.NEXT_PUBLIC_CLUB_FORM_URL ?? '#';

export function ClubsCatalog() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['clubs-catalog', value], async () => {
    const response = await fetchRecords<ClubRecord>('clubs', cityName ?? undefined);
    return response.list;
  });

  const clubs = useMemo(() => {
    if (!data) return [];
    return filterByCitySelection(data, value);
  }, [data, value]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState title="Не удалось загрузить клубы" description="Попробуйте обновить страницу позднее." />;
  }

  if (clubs.length === 0) {
    return (
      <EmptyState
        title="Клубы не найдены"
        description="Мы еще не знаем клубов в этом городе. Оставьте заявку, чтобы появиться первыми."
        action={
          <EmptyState.ActionButton asChild>
            <a href={clubFormUrl} target="_blank" rel="noopener noreferrer">
              Добавить клуб
            </a>
          </EmptyState.ActionButton>
        }
      />
    );
  }

  return (
    <div className="section-grid">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}
