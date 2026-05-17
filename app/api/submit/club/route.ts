import { NextResponse } from 'next/server';
import { isValidSocialLink, postToNocoDB, safeServerErrorLog, sendResendNotification } from '@/lib/server/submit';

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const socialLink = typeof body.socialLink === 'string' ? body.socialLink.trim() : '';

  if (!name || !city || !socialLink) {
    return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
  }

  if (!isValidSocialLink(socialLink)) {
    return NextResponse.json({ error: 'Укажите корректную ссылку (instagram, t.me, strava или https URL)' }, { status: 400 });
  }

  try {
    await postToNocoDB({ ...body, socialLink }, 'NOCODB_CLUB_SUBMIT_URL');
  } catch (error) {
    safeServerErrorLog('submit-club:nocodb', error);
    return NextResponse.json({ error: 'Не удалось сохранить заявку. Попробуйте позже.' }, { status: 502 });
  }

  try {
    await sendResendNotification({
      from: process.env.RESEND_FROM,
      to: [process.env.RESEND_TO],
      subject: 'Новая заявка на клуб',
      text: `Клуб: ${name}\nГород: ${city}\nСсылка: ${socialLink}`
    });
  } catch (error) {
    safeServerErrorLog('submit-club:resend', error);
    return NextResponse.json({ error: 'Заявка сохранена, но уведомление не отправлено.' }, { status: 202 });
  }

  return NextResponse.json({ ok: true });
}
