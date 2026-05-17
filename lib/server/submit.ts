const SOCIAL_LINK_RE = /^(https:\/\/)?(www\.)?(instagram\.com|t\.me|strava\.com)\/.+/i;

export function isValidSocialLink(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (url.protocol !== 'https:') return false;
    return true;
  } catch {
    return SOCIAL_LINK_RE.test(trimmed);
  }
}

export function safeServerErrorLog(context: string, error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`[${context}] ${message}`);
}

export async function postToNocoDB(body: Record<string, unknown>, targetEnv: string) {
  const endpoint = process.env[targetEnv];
  if (!endpoint) {
    throw new Error(`${targetEnv} is not configured`);
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`NocoDB request failed with status ${response.status}`);
  }

  return response;
}

export async function sendResendNotification(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) {
    throw new Error('Resend environment variables are not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}`);
  }
}
