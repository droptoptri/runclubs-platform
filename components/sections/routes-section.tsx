'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { RouteCard } from '@/components/cards/route-card';
import { Loader } from '@/components/ui/loader';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { useCity } from '@/components/ui/city-select';
import { fetchRecords } from '@/lib/api';
import { filterByCitySelection } from '@/lib/cities';
import type { RouteRecord } from '@/lib/types';

export function RoutesSection() {
  const { value, cityName } = useCity();
  const { data, error, isLoading } = useSWR(['routes', value], async () => {
    const response = await fetchRecords<RouteRecord>('routes', cityName ?? undefined);
    return response.list;
  });

  const routes = useMemo(() => {
    if (!data) return [];
    return filterByCitySelection(data, value).slice(0, 6);
  }, [data, value]);

  return (
    <Section title="Маршруты по городам" description="Подборки живописных дорожек для ваших пробежек">
      {isLoading ? <Loader /> : null}
      {error ? <EmptyState title="Не удалось загрузить маршруты" description="Попробуйте перезагрузить страницу." /> : null}
      {!isLoading && !error ? (
        routes.length > 0 ? (
          <div className="section-grid">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        ) : (
          <EmptyState title="Маршруты появятся скоро" description="Расскажите о своих любимых местах через форму ниже." />
        )
      ) : null}
    </Section>
  );
}
