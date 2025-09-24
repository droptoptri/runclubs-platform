'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { CITY_OPTIONS, cityValueToName, type CityValue } from '@/lib/cities';

const STORAGE_KEY = 'runclubs-city';

type CityContextValue = {
  value: CityValue;
  cityName?: string;
  setValue: (value: CityValue) => void;
};

const CityContext = createContext<CityContextValue | undefined>(undefined);

function getInitialValue(): CityValue {
  if (typeof window === 'undefined') {
    return 'moscow';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as CityValue | null;
  return stored ?? 'moscow';
}

export function CityProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<CityValue>(() => getInitialValue());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, value);
  }, [value]);

  const cityName = useMemo(() => cityValueToName(value), [value]);

  const contextValue = useMemo<CityContextValue>(
    () => ({
      value,
      cityName,
      setValue
    }),
    [cityName, value]
  );

  return <CityContext.Provider value={contextValue}>{children}</CityContext.Provider>;
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within CityProvider');
  }
  return context;
}

export function CitySelect() {
  const { value, setValue } = useCity();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden font-medium sm:inline">Город</span>
      <select
        className={clsx(
          'rounded-full border border-ink/10 bg-white px-4 py-2 text-sm shadow-soft transition hover:border-ink/20 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10'
        )}
        value={value}
        onChange={(event) => setValue(event.target.value as CityValue)}
      >
        {CITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export type { CityValue } from '@/lib/cities';
