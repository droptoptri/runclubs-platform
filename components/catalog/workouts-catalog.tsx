'use client';

import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { WorkoutCard } from '@/components/cards/workout-card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Loader } from '@/components/ui/loader';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { WorkoutRecord } from '@/lib/types';

const runFormUrl = process.env.NEXT_PUBLIC_RUN_FORM_URL ?? '#';

export function WorkoutsCatalog() {
  const [onlyOpen, setOnlyOpen] = useState(false);
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['workouts-catalog', value], async () => {
    const response = await fetchRecords<WorkoutRecord>('workouts', cityName ?? undefined);
    return response.list;
  });

  const workouts = useMemo(() => {
    if (!data) return [];
    const filtered = filterByCitySelection(data, value);
    if (!onlyOpen) return filtered;
    return filtered.filter((workout) => workout.isOpen);
  }, [data, value, onlyOpen]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant={onlyOpen ? 'primary' : 'ghost'}
          onClick={() => setOnlyOpen((prev) => !prev)}
          className={onlyOpen ? '' : 'border border-ink/10'}
        >
          Только открытые
        </Button>
      </div>

      {isLoading ? <Loader /> : null}
      {error ? <EmptyState title="Не удалось загрузить тренировки" description="Повторите попытку позже." /> : null}

      {!isLoading && !error ? (
        workouts.length > 0 ? (
          <div className="section-grid">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Тренировки не найдены"
            description="Расскажите о своей пробежке, чтобы попасть в афишу."
            action={
              <EmptyState.ActionButton asChild>
                <a href={runFormUrl} target="_blank" rel="noopener noreferrer">
                  Предложить тренировку
                </a>
              </EmptyState.ActionButton>
            }
          />
        )
      ) : null}
    </div>
  );
}
