-- Seed data for lookup tables
-- Run this AFTER schema.sql and policies.sql

-- ===========================================
-- ROLES
-- ===========================================

INSERT INTO public.roles (id, name) VALUES
    (1, 'admin'),
    (2, 'moderator'),
    (3, 'user');

-- ===========================================
-- STATUSES (for notes)
-- ===========================================

INSERT INTO public.statuses (id, name) VALUES
    (1, 'new'),
    (2, 'in progress'),
    (3, 'done');

-- ===========================================
-- SAMPLE TAGS (optional)
-- ===========================================

INSERT INTO public.tags (name) VALUES
    ('Next.js'),
    ('React'),
    ('TypeScript'),
    ('Supabase'),
    ('Tailwind CSS');
