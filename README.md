# На Районе — локальная социальная сеть

Полноценный запускаемый MVP: Next.js + TypeScript + Prisma + SQLite. Архитектура рассчитана на старт в одном населённом пункте и последующее вынесение БД/кэша/очередей в отдельные сервисы.

## Что уже работает
- регистрация и JWT-cookie авторизация;
- локальная лента и объявления с TTL;
- мероприятия, участники «Пойду/Возможно» и уведомления организатора;
- спонтанные публикации с автоматическим истечением актуальности;
- поиск жителей;
- доска работы/услуг через общую модель публикаций;
- календарь с публичными мероприятиями + личные записи в БД;
- карта OpenStreetMap/Leaflet без API-ключа;
- личные чаты и уведомления о сообщениях (polling MVP);
- жалобы, блокировка пользователей, rate limiting публикаций;
- роли USER/MODERATOR/ADMIN и административная панель;
- PWA manifest/service worker и endpoint для Web Push subscription;
- seed-данные;
- Dockerfile и docker-compose;
- базовые unit-тесты критичной логики.

## Быстрый запуск
1. Установить Node.js 20+.
2. `cp .env.example .env`
3. Задать длинный `JWT_SECRET`.
4. `npm install`
5. `npx prisma migrate deploy`
6. `npm run db:seed`
7. `npm run dev`
8. Открыть http://localhost:3000

Демо: `demo@narayon.local` / `demo12345`. Админ: `admin@narayon.local` / `demo12345`.

## Docker
`cp .env.example .env && docker compose up --build`

## Тесты
`npm test`

## Карты
Используется OpenStreetMap через Leaflet. Для публичного production-сервиса следует подключить подходящий tile provider с соблюдением его политики использования.

## Production hardening
Перед публичным запуском рекомендуется: PostgreSQL вместо SQLite, Redis для rate limiting, отдельное object storage для фото, подтверждение email/SMS через провайдера, CSP/security headers, CSRF-защита для state-changing web requests, audit log, background worker для истечения TTL/напоминаний, WebSocket/SSE вместо polling, полноценная Web Push отправка, резервное копирование, observability и внешний модерационный workflow.
