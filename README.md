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

Создайте файл `.env` на основе примера:

```bash
cp .env.example .env
```

Список переменных:

- `NEXT_PUBLIC_CLUBS_URL`
- `NEXT_PUBLIC_WORKOUTS_URL`
- `NEXT_PUBLIC_RACES_URL`
- `NEXT_PUBLIC_ROUTES_URL`
- `NEXT_PUBLIC_CLUB_FORM_URL`
- `NEXT_PUBLIC_RUN_FORM_URL`
- `NOCODB_TOKEN` (опционально, только если нужен приватный доступ к API)

## Запуск локально

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
```

## Деплой на Vercel

1. Создайте новый проект в Vercel и подключите репозиторий.
2. В разделе **Environment Variables** добавьте переменные из `.env`.
3. Запустите деплой — Vercel автоматически соберёт и опубликует приложение.

После деплоя убедитесь, что на главной странице отображаются данные и корректно работает фильтр города.
