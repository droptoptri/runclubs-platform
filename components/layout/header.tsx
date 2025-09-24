'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { CitySelect } from '@/components/ui/city-select';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/clubs', label: 'Клубы' },
  { href: '/workouts', label: 'Тренировки' },
  { href: '/races', label: 'Забеги' },
  { href: '/routes', label: 'Маршруты' }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/20 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            RunClubs
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'rounded-full px-3 py-1 transition-colors duration-150',
                  pathname === link.href
                    ? 'bg-ink text-background'
                    : 'hover:bg-ink/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <CitySelect />
          <Button asChild variant="outline" className="sm:hidden">
            <Link href="/workouts">Афиша</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
