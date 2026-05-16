-- Ecuflow Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (syncs with Clerk)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD' CHECK (currency IN ('USD', 'CUP', 'MLC')),
  category TEXT NOT NULL CHECK (category IN ('powerbanks', 'ecoflow', 'solar_panels', 'accessories')),
  images TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '[]',
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_delivery', 'delivered', 'cancelled')),
  notes TEXT,
  shipping_address TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table (1:1 between user and admin)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  chat_type TEXT DEFAULT 'sales' CHECK (chat_type IN ('product_owner', 'sales')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'admin')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_owner_id ON products(owner_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_product_id ON conversations(product_id);
CREATE INDEX IF NOT EXISTS idx_conversations_chat_type ON conversations(chat_type);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read/update their own profile, admins can read all
CREATE POLICY "Users can read own profile" ON users FOR SELECT
  USING (auth.uid()::text = clerk_id OR EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.uid()::text AND role = 'admin'));

CREATE POLICY "Users can update own profile" ON users FOR UPDATE
  USING (auth.uid()::text = clerk_id);

-- Products: Everyone can read products
DROP POLICY IF EXISTS "Everyone can read products" ON products;
CREATE POLICY "Anyone can read products" ON products FOR SELECT USING (true);

-- Admin can insert/update/delete products
DROP POLICY IF EXISTS "Admin can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products FOR ALL
  USING (auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

-- Orders: Users can read their own orders, admins can read all
CREATE POLICY "Users can read own orders" ON orders FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create orders" ON orders FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own orders" ON orders FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Admin can manage all orders" ON orders FOR ALL
  USING (auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

-- Conversations: Users see own, admins see all
CREATE POLICY "Users can read own conversations" ON conversations FOR SELECT
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Admin can read all conversations" ON conversations FOR SELECT
  USING (auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

CREATE POLICY "Users can create conversations" ON conversations FOR INSERT
  WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE
  USING (user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text) OR auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

-- Messages: Same as conversations
CREATE POLICY "Users can read own messages" ON messages FOR SELECT
  USING (conversation_id IN (SELECT id FROM conversations WHERE user_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text)));

CREATE POLICY "Admin can read all messages" ON messages FOR SELECT
  USING (auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

CREATE POLICY "Users can send messages" ON messages FOR INSERT
  WITH CHECK (sender_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own messages" ON messages FOR UPDATE
  USING (sender_id IN (SELECT id FROM users WHERE clerk_id = auth.uid()::text) OR auth.uid()::text IN (SELECT clerk_id FROM users WHERE role = 'admin'));

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Seed initial products (optional - you can insert via admin panel)
-- INSERT INTO products (name, slug, description, price, category, images, specs, stock, featured)
-- VALUES (...);