const API_URLS = {
  clubs: process.env.NEXT_PUBLIC_CLUBS_URL ?? '',
  workouts: process.env.NEXT_PUBLIC_WORKOUTS_URL ?? '',
  races: process.env.NEXT_PUBLIC_RACES_URL ?? '',
  routes: process.env.NEXT_PUBLIC_ROUTES_URL ?? ''
};

export type DataKind = keyof typeof API_URLS;

const USE_PROXY = process.env.NEXT_PUBLIC_HAS_NOCODB_TOKEN === '1';

export function buildWhere(city?: string) {
  if (!city) {
    return undefined;
  }
  return `where=(city,eq,${encodeURIComponent(city)})`;
}

function withParams(url: string, params?: Record<string, string>) {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  const searchParams = new URLSearchParams(params);
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${searchParams.toString()}`;
}

export async function fetchJson<T = unknown>(url: string, params?: Record<string, string>): Promise<T> {
  const target = withParams(url, params);
  const response = await fetch(target);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchRecords<T = unknown>(
  kind: DataKind,
  city?: string,
  params: Record<string, string> = {}
) : Promise<RecordListResponse<T>> {
  const baseUrl = API_URLS[kind];
  if (!baseUrl) {
    throw new Error(`Отсутствует URL для ресурса ${kind}`);
  }

  const finalParams = { ...params };
  const where = buildWhere(city);
  if (where) {
    finalParams.where = where;
    if (!finalParams.limit) {
      finalParams.limit = '100';
    }
  }

  if (USE_PROXY) {
    return fetchJson<RecordListResponse<T>>(`/api/noco`, { kind, ...finalParams });
  }

  return fetchJson<RecordListResponse<T>>(baseUrl, finalParams);
}

export type RecordListResponse<T> = {
  list: T[];
};
