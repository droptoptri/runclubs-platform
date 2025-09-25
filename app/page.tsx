import { CTASection } from '@/components/sections/cta-section';
import { COPY } from '@/content/ru';
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
            <p className="text-lg sm:text-xl text-neutral-700">
              {COPY.hero.tagline}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm text-ink/70 md:w-72">
            <div>
              <dt className="font-semibold text-ink">&gt;50 клубов</dt>
              <dd>{COPY.clubs.subtitle}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Маршруты</dt>
              <dd>Лучшие дорожки для утренних и вечерних пробежек.</dd>
            </div>
          </dl>
        </div>
      </section>

      <WeekendWorkoutsSection
        title={COPY.events.title}
        subtitle={COPY.events.subtitle}
      />
      <TopClubsSection
        title={COPY.clubs.title}
        subtitle={COPY.clubs.subtitle}
      />
      <UpcomingRacesSection />
      <RoutesSection />
      <CTASection />
    </div>
  );
}
