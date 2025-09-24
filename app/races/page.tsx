import type { Metadata } from 'next';
import { RacesCatalog } from '@/components/catalog/races-catalog';

export const metadata: Metadata = {
  title: 'Календарь забегов — RunClubs',
  description: 'Календарь ближайших стартов и забегов в выбранном городе.'
};

export default function RacesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Ближайшие забеги</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Планируйте участие в стартах и следите за календарем забегов в вашем городе.
        </p>
      </header>
      <RacesCatalog />
    </div>
  );
}
