-- Схема Supabase для «Тесто и Дым»
-- Выполните в SQL Editor вашего проекта Supabase

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  customer_comment TEXT,
  delivery_type TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  admin_message TEXT,
  payment_status TEXT DEFAULT 'not_required'
);

-- Таблица вопросов
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  admin_reply TEXT,
  replied_at TIMESTAMPTZ
);

-- Нормализация телефона (только цифры)
CREATE OR REPLACE FUNCTION normalize_phone(p TEXT)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT regexp_replace(COALESCE(p, ''), '\D', '', 'g');
$$;

-- Поиск заказа клиентом (номер + телефон)
CREATE OR REPLACE FUNCTION get_order_by_credentials(
  p_order_id TEXT,
  p_phone TEXT
)
RETURNS SETOF orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT o.*
  FROM orders o
  WHERE o.id = p_order_id
    AND normalize_phone(o.customer_phone) = normalize_phone(p_phone)
  LIMIT 1;
END;
$$;

-- Поиск вопроса клиентом (номер + телефон)
CREATE OR REPLACE FUNCTION get_question_by_credentials(
  p_question_id TEXT,
  p_phone TEXT
)
RETURNS SETOF questions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT q.*
  FROM questions q
  WHERE q.id = p_question_id
    AND normalize_phone(q.phone) = normalize_phone(p_phone)
  LIMIT 1;
END;
$$;

-- Админ: обновление заказа (замените 'your-admin-secret' на свой секрет)
CREATE OR REPLACE FUNCTION admin_update_order(
  p_secret TEXT,
  p_order_id TEXT,
  p_status TEXT,
  p_admin_message TEXT DEFAULT NULL
)
RETURNS orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result orders;
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  UPDATE orders
  SET
    status = p_status,
    admin_message = COALESCE(p_admin_message, admin_message)
  WHERE id = p_order_id
  RETURNING * INTO result;

  RETURN result;
END;
$$;

-- Админ: удаление заказа
CREATE OR REPLACE FUNCTION admin_delete_order(
  p_secret TEXT,
  p_order_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  DELETE FROM orders WHERE id = p_order_id;
  RETURN TRUE;
END;
$$;

-- Админ: ответ на вопрос
CREATE OR REPLACE FUNCTION admin_reply_question(
  p_secret TEXT,
  p_question_id TEXT,
  p_admin_reply TEXT
)
RETURNS questions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result questions;
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  UPDATE questions
  SET
    admin_reply = p_admin_reply,
    status = 'answered',
    replied_at = NOW()
  WHERE id = p_question_id
  RETURNING * INTO result;

  RETURN result;
END;
$$;

-- Админ: удаление вопроса
CREATE OR REPLACE FUNCTION admin_delete_question(
  p_secret TEXT,
  p_question_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  DELETE FROM questions WHERE id = p_question_id;
  RETURN TRUE;
END;
$$;

-- Админ: список всех заказов
CREATE OR REPLACE FUNCTION admin_get_orders(p_secret TEXT)
RETURNS SETOF orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  RETURN QUERY SELECT * FROM orders ORDER BY created_at DESC;
END;
$$;

-- Админ: список всех вопросов
CREATE OR REPLACE FUNCTION admin_get_questions(p_secret TEXT)
RETURNS SETOF questions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_secret IS NULL OR p_secret != 'your-admin-secret' THEN
    RAISE EXCEPTION 'Недостаточно прав';
  END IF;

  RETURN QUERY SELECT * FROM questions ORDER BY created_at DESC;
END;
$$;

-- RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Клиент может создавать заказы и вопросы
CREATE POLICY "allow_insert_orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "allow_insert_questions" ON questions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Прямое чтение/изменение запрещено (только через RPC)
CREATE POLICY "deny_select_orders" ON orders FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "deny_select_questions" ON questions FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "deny_update_orders" ON orders FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "deny_update_questions" ON questions FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "deny_delete_orders" ON orders FOR DELETE TO anon, authenticated USING (false);
CREATE POLICY "deny_delete_questions" ON questions FOR DELETE TO anon, authenticated USING (false);

-- Права на RPC
GRANT EXECUTE ON FUNCTION get_order_by_credentials TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_question_by_credentials TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_update_order TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_delete_order TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_reply_question TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_delete_question TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_get_orders TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_get_questions TO anon, authenticated;
