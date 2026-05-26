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

## Авторизация администратора

- Логин: `admin`
- Пароль: `admin123`

## Возможности

### Клиентская часть
- Просмотр и добавление гастробоксов в корзину
- Оформление предзаказа (доставка / самовывоз)
- Кнопка «Задать вопрос» (отдельное модальное окно)
- Telegram и ВК — для уточнений, не для заказа

### Админ-панель `/admin`
- **Заказы** — просмотр, смена статуса, удаление
- **Гастробоксы** — добавление, редактирование, удаление
- **Вопросы** — просмотр, отметка «Отвечен», удаление

## Хранение данных

Данные сохраняются в `localStorage`:
- `testo-i-dym-orders` — заказы
- `testo-i-dym-questions` — вопросы
- `testo-i-dym-products` — гастробоксы
- `testo-i-dym-cart` — корзина

Слой `src/lib/storage/` подготовлен для замены на backend / Firebase / Supabase.

## Структура

```
src/
├── components/
│   ├── admin/          # Панель администратора
│   ├── cart/           # Корзина
│   ├── checkout/       # Оформление заказа
│   ├── question/       # Окно вопроса
│   ├── products/       # Карточка бокса
│   └── sections/       # Секции сайта
├── context/            # CartContext, ProductsContext
├── data/initialProducts.js
├── lib/
│   ├── constants.js
│   ├── order/
│   ├── payment/        # Заглушки под ЮKassa, Т-Банк, СБП
│   └── storage/
└── pages/              # HomePage, AdminPage
```
