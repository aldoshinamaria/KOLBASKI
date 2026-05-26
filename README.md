# Тесто и Дым

Landing page и мини-система заказов для ремесленного гастробренда «Тесто и Дым».

## Запуск

```bash
npm install
npm run dev
npm run build
npm run preview
```

- Сайт: http://localhost:5173/
- Админ-панель: http://localhost:5173/admin
- Продакшен: https://aldoshinamaria.github.io/KOLBASKI/

## Публикация на GitHub Pages

Сайт публикуется **из ветки `main`** (Settings → Pages → main / root).

При каждом push в `main` GitHub Actions собирает проект и обновляет в корне репозитория:
`index.html`, `assets/`, `404.html`, изображения.

Локально перед push можно проверить:

```bash
npm run build:pages
npm run preview
```

Откройте http://localhost:4173/KOLBASKI/

## Авторизация администратора

- Логин: `admin`
- Пароль: `admin123`

## Возможности

### Клиентская часть
- Просмотр и добавление гастробоксов в корзину
- Оформление предзаказа (доставка / самовывоз)
- **Отслеживание заказа** — страница `/track` (номер + телефон)
- Кнопка «Задать вопрос» (отдельное модальное окно)
- Telegram и ВК — для срочных уточнений, не для заказа

### Админ-панель `/admin`
- **Заказы** — просмотр, смена статуса, комментарий для клиента, удаление
- **Гастробоксы** — добавление, редактирование, удаление
- **Вопросы** — просмотр, ответ клиенту, удаление

## Supabase (заказы и вопросы)

Без `.env` заказы и вопросы сохраняются в `localStorage` (отслеживание работает только в том же браузере).

Для синхронизации между устройствами:

1. Создайте проект на [supabase.com](https://supabase.com)
2. В SQL Editor выполните скрипт `supabase/schema.sql`
3. В `schema.sql` замените `'your-admin-secret'` на свой секрет (тот же, что в `.env`)
4. Скопируйте `.env.example` → `.env` и заполните:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_SECRET=your-admin-secret
```

5. Перезапустите `npm run dev`

Клиент ищет заказ/вопрос по номеру и телефону через RPC. Админка обновляет статус и ответы через защищённые RPC с `VITE_ADMIN_SECRET`.

## Хранение данных

- **Заказы и вопросы** — Supabase (или `localStorage` без `.env`)
- **Гастробоксы и корзина** — `localStorage`:
  - `testo-i-dym-products` — гастробоксы
  - `testo-i-dym-cart` — корзина
  - `testo-i-dym-last-order` / `testo-i-dym-last-question` — последние номера для `/track`

## Структура

```
src/
├── components/
│   ├── admin/          # Панель администратора
│   ├── cart/           # Корзина
│   ├── checkout/       # Оформление заказа
│   ├── question/       # Окно вопроса
│   ├── track/            # Отслеживание заказа и вопроса
│   ├── products/         # Карточка бокса
│   └── sections/       # Секции сайта
├── context/            # CartContext, ProductsContext
├── data/initialProducts.js
├── lib/
│   ├── constants.js
│   ├── order/
│   ├── supabase/         # Клиент Supabase
│   ├── payment/          # Заглушки под ЮKassa, Т-Банк, СБП
│   └── storage/
└── pages/              # HomePage, AdminPage, TrackPage
```
