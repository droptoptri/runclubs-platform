'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { COPY } from '@/content/ru';
import { WorkoutCard } from '@/components/cards/workout-card';
import { Loader } from '@/components/ui/loader';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { WorkoutRecord } from '@/lib/types';

type Props = {
  title?: string;
  subtitle?: string;
};

export function WeekendWorkoutsSection({
  title = COPY.events.title,
  subtitle = COPY.events.subtitle,
}: Props) {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['workouts', value], async () => {
    const response = await fetchRecords<WorkoutRecord>('workouts', cityName ?? undefined);
    return response.list;
  });

  const workouts = useMemo(() => {
    if (!data) return [];
    return filterByCitySelection(data, value);
  }, [data, value]);

  return (
    <Section title={title} description={subtitle}>
      {isLoading ? <Loader /> : null}
      {error ? <EmptyState title="Не удалось загрузить данные" description="Попробуйте обновить страницу." /> : null}
      {!isLoading && !error ? (
        workouts.length > 0 ? (
          <div className="section-grid">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <EmptyState title="Пока нет событий" description="Здесь появятся тренировки по выбранному направлению." />
        )
      ) : null}
    </Section>
  );
}
