import type { Metadata } from 'next';
import { WorkoutsCatalog } from '@/components/catalog/workouts-catalog';

export const metadata: Metadata = {
  title: 'Тренировки и пробежки — RunClubs',
  description: 'Актуальная афиша совместных пробежек и открытых тренировок в городах России.'
};

export default function WorkoutsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Афиша тренировок</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Выбирайте ближайшие пробежки по темпу и формату. Переключайтесь на «только открытые», чтобы видеть
          мероприятия без предварительной записи.
        </p>
      </header>
      <WorkoutsCatalog />
    </div>
  );
}
