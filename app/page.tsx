import { CTASection } from '@/components/sections/cta-section';
import { RoutesSection } from '@/components/sections/routes-section';
import { TopClubsSection } from '@/components/sections/top-clubs-section';
import { UpcomingRacesSection } from '@/components/sections/upcoming-races-section';
import { WeekendWorkoutsSection } from '@/components/sections/weekend-workouts-section';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-white px-6 py-16 shadow-soft sm:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-accent/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
              Беговое комьюнити
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              RunClubs — карта клубов, тренировок и забегов
            </h1>
            <p className="max-w-2xl text-lg text-ink/70">
              Мы собираем в одном месте афишу выходных, подборку проверенных клубов и маршруты для пробежек в
              городах России. Выбирайте свой темп и присоединяйтесь к движению.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm text-ink/70 md:w-72">
            <div>
              <dt className="font-semibold text-ink">>50 клубов</dt>
              <dd>Только проверенные сообщества с открытыми тренерами.</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Маршруты</dt>
              <dd>Лучшие дорожки для утренних и вечерних пробежек.</dd>
            </div>
          </dl>
        </div>
      </section>

      <WeekendWorkoutsSection />
      <TopClubsSection />
      <UpcomingRacesSection />
      <RoutesSection />
      <CTASection />
    </div>
  );
}
