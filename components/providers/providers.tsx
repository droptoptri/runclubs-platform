'use client';

import { useEffect, type ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { CityProvider } from '@/components/ui/city-select';
import { fetchJson } from '@/lib/api';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const register = async () => {
        try {
          await navigator.serviceWorker.register('/sw.js');
        } catch (error) {
          console.error('SW registration failed', error);
        }
      };

      if (document.readyState === 'complete') {
        register();
      } else {
        window.addEventListener('load', register, { once: true });
      }
    }
  }, []);

  return (
    <CityProvider>
      <SWRConfig value={{ fetcher: (resource: string) => fetchJson(resource), revalidateOnFocus: false }}>
        {children}
      </SWRConfig>
    </CityProvider>
  );
}
