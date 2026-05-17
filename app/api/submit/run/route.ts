import { NextRequest, NextResponse } from 'next/server';
import { createNocoRecord, enforceRateLimit, getClientIp, sendResendEmail, validateRunPayload } from '@/lib/submit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(ip);
  if (!rateLimit.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } });
  }

  const body = await request.json();
  if (body.website) return NextResponse.json({ ok: true });

  const validated = validateRunPayload(body);
  if (!validated.ok) return NextResponse.json({ errors: validated.errors }, { status: 400 });

  await createNocoRecord(process.env.NOCODB_WORKOUTS_TABLE_ID, {
    Title: validated.data.title,
    City: validated.data.city,
    Date: validated.data.date,
    Location: validated.data.location,
    DistanceKm: validated.data.distanceKm,
    PaceMin: validated.data.paceMin,
    PaceMax: validated.data.paceMax,
    Description: validated.data.description,
    OrganizerName: validated.data.organizerName,
    OrganizerEmail: validated.data.organizerEmail
    // TODO: Update keys above to exact NocoDB column names if schema differs.
  });

  await sendResendEmail(
    `Новая заявка пробежки: ${validated.data.title}`,
    `<h2>Новая пробежка</h2><p><b>Название:</b> ${validated.data.title}</p><p><b>Город:</b> ${validated.data.city}</p><p><b>Дата:</b> ${validated.data.date}</p><p><b>Организатор:</b> ${validated.data.organizerName}</p><p><b>Email:</b> ${validated.data.organizerEmail}</p>`
  );

  return NextResponse.json({ ok: true });
}
