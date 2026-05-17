import { NextRequest, NextResponse } from 'next/server';
import { createNocoRecord, enforceRateLimit, getClientIp, sendResendEmail, validateClubPayload } from '@/lib/submit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(ip);
  if (!rateLimit.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } });
  }

  const body = await request.json();
  if (body.website) return NextResponse.json({ ok: true });

  const validated = validateClubPayload(body);
  if (!validated.ok) return NextResponse.json({ errors: validated.errors }, { status: 400 });

  await createNocoRecord(process.env.NOCODB_CLUBS_TABLE_ID, {
    Name: validated.data.clubName,
    City: validated.data.city,
    ContactName: validated.data.contactName,
    ContactEmail: validated.data.contactEmail,
    Instagram: validated.data.instagram,
    Description: validated.data.description
    // TODO: Update keys above to exact NocoDB column names if schema differs.
  });

  await sendResendEmail(
    `Новая заявка клуба: ${validated.data.clubName}`,
    `<h2>Новый клуб</h2><p><b>Клуб:</b> ${validated.data.clubName}</p><p><b>Город:</b> ${validated.data.city}</p><p><b>Контакт:</b> ${validated.data.contactName}</p><p><b>Email:</b> ${validated.data.contactEmail}</p>`
  );

  return NextResponse.json({ ok: true });
}
