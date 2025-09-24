import Link from 'next/link';
import { Button } from '@/components/ui/button';

const clubFormUrl = process.env.NEXT_PUBLIC_CLUB_FORM_URL ?? '#';
const runFormUrl = process.env.NEXT_PUBLIC_RUN_FORM_URL ?? '#';

export function CTASection() {
  return (
    <section className="mt-16 rounded-3xl bg-ink text-background">
      <div className="flex flex-col gap-6 px-8 py-12 sm:px-12 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">Присоединяйтесь к RunClubs</h2>
          <p className="max-w-xl text-base text-white/80">
            Добавьте свой клуб или предложите открытую пробежку — мы поможем рассказать о вас беговому
            комьюнити в России.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={clubFormUrl} target="_blank" rel="noopener noreferrer">
              Заявка на клуб
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="border border-white/30 text-background hover:bg-white/10"
          >
            <Link href={runFormUrl} target="_blank" rel="noopener noreferrer">
              Предложить пробежку
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
