import { NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipStore = new Map<string, { count: number; expiresAt: number }>();

export function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  const realIp = request.headers.get('x-real-ip');
  return realIp ?? 'unknown';
}

export function enforceRateLimit(ip: string) {
  const now = Date.now();
  const hit = ipStore.get(ip);

  if (!hit || hit.expiresAt <= now) {
    ipStore.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true as const };
  }

  if (hit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { ok: false as const, retryAfter: Math.ceil((hit.expiresAt - now) / 1000) };
  }

  hit.count += 1;
  return { ok: true as const };
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export type ClubSubmitPayload = {
  clubName: string;
  city: string;
  contactName: string;
  contactEmail: string;
  instagram?: string;
  description?: string;
};

export type RunSubmitPayload = {
  title: string;
  city: string;
  date: string;
  location: string;
  distanceKm?: number;
  paceMin?: number;
  paceMax?: number;
  description?: string;
  organizerName: string;
  organizerEmail: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const igRe = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/i;

export function validateClubPayload(raw: unknown) {
  const body = (raw ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const clubName = normalizeText(body.clubName);
  const city = normalizeText(body.city);
  const contactName = normalizeText(body.contactName);
  const contactEmail = normalizeText(body.contactEmail);
  const instagram = normalizeText(body.instagram);
  const description = normalizeText(body.description);

  if (!clubName || clubName.length < 2) errors.clubName = 'Название клуба должно быть не короче 2 символов';
  if (!city || city.length < 2) errors.city = 'Укажите город';
  if (!contactName || contactName.length < 2) errors.contactName = 'Укажите контактное имя';
  if (!emailRe.test(contactEmail)) errors.contactEmail = 'Некорректный email';
  if (instagram && !igRe.test(instagram)) errors.instagram = 'Укажите ссылку на Instagram профиля';
  if (description.length > 1500) errors.description = 'Описание слишком длинное';

  return { ok: Object.keys(errors).length === 0, errors, data: { clubName, city, contactName, contactEmail, instagram: instagram || undefined, description: description || undefined } as ClubSubmitPayload };
}

export function validateRunPayload(raw: unknown) {
  const body = (raw ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const title = normalizeText(body.title);
  const city = normalizeText(body.city);
  const date = normalizeText(body.date);
  const location = normalizeText(body.location);
  const description = normalizeText(body.description);
  const organizerName = normalizeText(body.organizerName);
  const organizerEmail = normalizeText(body.organizerEmail);
  const distanceKm = body.distanceKm === '' || body.distanceKm == null ? undefined : Number(body.distanceKm);
  const paceMin = body.paceMin === '' || body.paceMin == null ? undefined : Number(body.paceMin);
  const paceMax = body.paceMax === '' || body.paceMax == null ? undefined : Number(body.paceMax);

  if (!title || title.length < 2) errors.title = 'Укажите название пробежки';
  if (!city || city.length < 2) errors.city = 'Укажите город';
  if (!date) errors.date = 'Укажите дату';
  if (!location || location.length < 2) errors.location = 'Укажите место сбора';
  if (!organizerName || organizerName.length < 2) errors.organizerName = 'Укажите ваше имя';
  if (!emailRe.test(organizerEmail)) errors.organizerEmail = 'Некорректный email';
  if (description.length > 1500) errors.description = 'Описание слишком длинное';

  if (distanceKm != null && (!Number.isFinite(distanceKm) || distanceKm <= 0 || distanceKm > 200)) errors.distanceKm = 'Дистанция должна быть от 0 до 200 км';
  if (paceMin != null && (!Number.isFinite(paceMin) || paceMin <= 0 || paceMin > 20)) errors.paceMin = 'Темп должен быть в мин/км';
  if (paceMax != null && (!Number.isFinite(paceMax) || paceMax <= 0 || paceMax > 20)) errors.paceMax = 'Темп должен быть в мин/км';
  if (paceMin != null && paceMax != null && paceMin > paceMax) errors.paceMax = 'Максимальный темп должен быть больше минимального';

  return { ok: Object.keys(errors).length === 0, errors, data: { title, city, date, location, description: description || undefined, organizerName, organizerEmail, distanceKm, paceMin, paceMax } as RunSubmitPayload };
}

export async function sendResendEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    throw new Error('Email env vars are missing');
  }

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from, to: [to], subject, html })
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Resend error: ${resp.status} ${text}`);
  }
}

export async function createNocoRecord(tableId: string | undefined, payload: Record<string, unknown>) {
  const url = process.env.NOCODB_URL;
  const token = process.env.NOCODB_TOKEN;
  if (!url || !token || !tableId) {
    throw new Error('NocoDB env vars are missing');
  }

  const target = `${url.replace(/\/$/, '')}/api/v2/tables/${tableId}/records`;
  const resp = await fetch(target, {
    method: 'POST',
    headers: {
      'xc-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`NocoDB error: ${resp.status} ${text}`);
  }
}
