-- Run this in the Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  phone text not null,
  appointment_date date not null,
  appointment_time time not null,
  service text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists appointments_created_at_idx on appointments (created_at desc);

-- Row Level Security
alter table appointments enable row level security;

-- No public policies are created intentionally.
-- All reads/writes happen through the Next.js API routes using the
-- SUPABASE_SERVICE_ROLE_KEY (server-side only), which bypasses RLS.
-- This keeps the appointments table fully private from the browser.
