export type CityValue = 'moscow' | 'spb' | 'other';

export const CITY_OPTIONS: { value: CityValue; label: string; cityName?: string }[] = [
  { value: 'moscow', label: 'Москва', cityName: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург', cityName: 'Санкт-Петербург' },
  { value: 'other', label: 'Другие города' }
];

export const PRIMARY_CITIES = CITY_OPTIONS.filter((option) => option.cityName).map(
  (option) => option.cityName as string
);

export function cityValueToName(value: CityValue) {
  return CITY_OPTIONS.find((option) => option.value === value)?.cityName;
}

export function filterByCitySelection<T extends { city?: string | null }>(list: T[], value: CityValue) {
  if (value === 'other') {
    return list.filter((item) => !item.city || !PRIMARY_CITIES.includes(item.city));
  }

  const cityName = cityValueToName(value);
  if (!cityName) {
    return list;
  }

  return list.filter((item) => item.city === cityName);
}
