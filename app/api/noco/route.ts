import { NextResponse } from 'next/server';

const KIND_TO_ENV: Record<string, string> = {
  clubs: 'NEXT_PUBLIC_CLUBS_URL',
  workouts: 'NEXT_PUBLIC_WORKOUTS_URL',
  races: 'NEXT_PUBLIC_RACES_URL',
  routes: 'NEXT_PUBLIC_ROUTES_URL'
};

export async function GET(request: Request) {
  if (!process.env.NOCODB_TOKEN) {
    return NextResponse.json(
      { error: 'NOCODB_TOKEN is not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const kind = searchParams.get('kind');

  if (!kind || !(kind in KIND_TO_ENV)) {
    return NextResponse.json({ error: 'Unknown dataset kind' }, { status: 400 });
  }

  const baseUrl = process.env[KIND_TO_ENV[kind]];

  if (!baseUrl) {
    return NextResponse.json({ error: 'Source URL is not configured' }, { status: 500 });
  }

  const targetUrl = new URL(baseUrl);

  searchParams.delete('kind');
  searchParams.forEach((value, key) => {
    if (value) {
      targetUrl.searchParams.set(key, value);
    }
  });

  const response = await fetch(targetUrl.toString(), {
    headers: {
      'xc-token': process.env.NOCODB_TOKEN,
      accept: 'application/json'
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
