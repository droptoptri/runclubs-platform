import type { Metadata } from 'next';
import { RoutesCatalog } from '@/components/catalog/routes-catalog';

export const metadata: Metadata = {
  title: 'Маршруты для пробежек — RunClubs',
  description: 'Подборка проверенных беговых маршрутов в городах России.'
};

export default function RoutesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Маршруты для пробежек</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Исследуйте популярные и живописные маршруты для утренних и вечерних пробежек.
        </p>
      </header>
      <RoutesCatalog />
    </div>
  );
}
