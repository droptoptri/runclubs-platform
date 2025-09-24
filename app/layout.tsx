import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/providers';
import { Header } from '@/components/layout/header';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'RunClubs — беговые клубы и тренировки',
  description:
    'RunClubs помогает найти беговой клуб, тренировку, забег или маршрут в вашем городе.',
  metadataBase: new URL('https://runclubs.example'),
  openGraph: {
    title: 'RunClubs — беговые клубы и тренировки',
    description:
      'Подборка лучших клубов, маршрутов и забегов для бегового комьюнити России.',
    locale: 'ru_RU',
    siteName: 'RunClubs',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RunClubs — беговые клубы и тренировки',
    description:
      'Подборка лучших клубов, маршрутов и забегов для бегового комьюнити России.'
  },
  alternates: {
    canonical: '/' 
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon-192.svg'
  },
  manifest: '/manifest.webmanifest',
  themeColor: '#F9F9F7'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
