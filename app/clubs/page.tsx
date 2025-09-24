import type { Metadata } from 'next';
import { ClubsCatalog } from '@/components/catalog/clubs-catalog';

export const metadata: Metadata = {
  title: 'Беговые клубы — RunClubs',
  description: 'Каталог проверенных беговых клубов и тренеров в России.'
};

export default function ClubsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">Каталог беговых клубов</h1>
        <p className="max-w-2xl text-base text-ink/70">
          Найдите своё беговое комьюнити, тренера и регулярные тренировки. Используйте фильтр города в шапке,
          чтобы увидеть клубы рядом с вами.
        </p>
      </header>
      <ClubsCatalog />
    </div>
  );
}
