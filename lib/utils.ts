export function formatDate(value?: string) {
  if (!value) return 'Дата уточняется';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).format(parsed);
}

export function formatDateWithWeekday(value?: string) {
  if (!value) return 'Дата уточняется';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  }).format(parsed);
}

export function formatDistance(distance?: number | null) {
  if (distance === undefined || distance === null) {
    return null;
  }
  return `${distance.toString().replace('.', ',')} км`;
}

export function formatPace(min?: number | null, max?: number | null) {
  if (min === undefined && max === undefined) {
    return null;
  }
  if (min !== undefined && max !== undefined) {
    return `${min}-${max} мин/км`;
  }
  if (min !== undefined) {
    return `от ${min} мин/км`;
  }
  if (max !== undefined) {
    return `до ${max} мин/км`;
  }
  return null;
}
