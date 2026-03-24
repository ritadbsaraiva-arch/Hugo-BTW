-- Migration: Create users table for Kinetic Monolith
-- Date: 2026-03-24

-- 1. Create the users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('ADMIN', 'OPERATOR')) DEFAULT 'OPERATOR',
  status TEXT CHECK (status IN ('ACTIVE', 'SUSPENDED')) DEFAULT 'ACTIVE',
  last_login TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow authenticated users to read all users (for admin purposes)
CREATE POLICY "Allow authenticated read" ON public.users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to insert/update/delete
CREATE POLICY "Allow admin full access" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE email = auth.jwt() ->> 'email' 
      AND role = 'ADMIN'
    )
  );

-- 4. Initial data (optional)
-- INSERT INTO public.users (operator_id, name, email, role, status)
-- VALUES ('OP_CORE_01', 'Rita Saraiva', 'ritadbsaraiva@gmail.com', 'ADMIN', 'ACTIVE');
