'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { RouteCard } from '@/components/cards/route-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Loader } from '@/components/ui/loader';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { RouteRecord } from '@/lib/types';

const runFormUrl = '/submit/run';

export function RoutesCatalog() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['routes-catalog', value], async () => {
    const response = await fetchRecords<RouteRecord>('routes', cityName ?? undefined);
    return response.list;
  });

  const routes = useMemo(() => {
    if (!data) return [];
    return filterByCitySelection(data, value);
  }, [data, value]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState title="Не удалось загрузить маршруты" description="Повторите попытку позже." />;
  }

  if (routes.length === 0) {
    return (
      <EmptyState
        title="Маршруты не найдены"
        description="Расскажите о своей пробежке и помогите бегунам открыть новое место."
        action={
          <EmptyState.ActionButton asChild>
            <Link href={runFormUrl}>
              Поделиться маршрутом
            </Link>
          </EmptyState.ActionButton>
        }
      />
    );
  }

  return (
    <div className="section-grid">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}
