# RunClubs

Минималистичный русскоязычный сайт для бегового комьюнити. Приложение построено на Next.js 14 (App Router) с
TypeScript и Tailwind CSS. Данные подгружаются из публичных представлений NocoDB, при наличии `NOCODB_TOKEN`
используется серверный прокси с заголовком `xc-token`.

## Стек

- Next.js 14 + App Router
- TypeScript
- Tailwind CSS
- SWR для клиентского кеширования
- PWA-манифест и сервис-воркер для офлайн-доступа

## Переменные окружения

Публичные переменные для чтения каталогов:

- `NEXT_PUBLIC_CLUBS_URL`
- `NEXT_PUBLIC_WORKOUTS_URL`
- `NEXT_PUBLIC_RACES_URL`
- `NEXT_PUBLIC_ROUTES_URL`

Серверные переменные для submit-форм:

- `RESEND_API_KEY`
- `EMAIL_TO`
- `EMAIL_FROM`
- `NOCODB_URL`
- `NOCODB_TOKEN`
- `NOCODB_CLUBS_TABLE_ID`
- `NOCODB_WORKOUTS_TABLE_ID`

> Важно: `NOCODB_CLUBS_TABLE_ID` и `NOCODB_WORKOUTS_TABLE_ID` должны быть ID таблиц NocoDB
> (используются в `app/api/submit/club/route.ts` и `app/api/submit/run/route.ts`).

## Запуск локально

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Проверка сборки

```bash
npm run build
```

## Submit-формы

- `/submit/club` — заявка на клуб.
- `/submit/run` — заявка на открытую пробежку.
- Обе формы валидируются на сервере, содержат honeypot-поле (`website`) и простое rate limiting по IP.
- После успешной отправки:
  1. создаётся запись в NocoDB;
  2. отправляется email через Resend API.
