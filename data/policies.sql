-- Row Level Security Policies
-- Run this AFTER schema.sql

-- ===========================================
-- ENABLE RLS ON ALL TABLES
-- ===========================================

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- ROLES (read-only for everyone)
-- ===========================================

CREATE POLICY "Enable read access for all users" ON public.roles
    FOR SELECT USING (true);

-- ===========================================
-- PROFILES
-- ===========================================

CREATE POLICY "Enable read access for all users" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for specific users only" ON public.profiles
    FOR INSERT TO authenticated, anon, authenticator, supabase_auth_admin
    WITH CHECK (true);

CREATE POLICY "Enable update for users based on id" ON public.profiles
    FOR UPDATE TO authenticated, anon, authenticator, supabase_auth_admin
    USING ((SELECT auth.uid()) = id);

-- ===========================================
-- POSTS
-- ===========================================

CREATE POLICY "Enable read access for all users" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.posts
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update for users based on id_author" ON public.posts
    FOR UPDATE TO authenticated
    USING ((SELECT auth.uid()) = id_author);

CREATE POLICY "Enable delete for users based on id_author" ON public.posts
    FOR DELETE TO authenticated
    USING ((SELECT auth.uid()) = id_author);

-- ===========================================
-- TAGS
-- ===========================================

CREATE POLICY "Enable read access for all users" ON public.tags
    FOR SELECT USING (true);

CREATE POLICY "Enable all for authorised users" ON public.tags
    TO authenticated USING (true);

-- ===========================================
-- POST_TAGS
-- ===========================================

CREATE POLICY "Read tags" ON public.post_tags
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.post_tags
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON public.post_tags
    FOR DELETE TO authenticated
    USING (true);

-- ===========================================
-- NOTES
-- ===========================================

CREATE POLICY "Enable AL for users based on id_author" ON public.notes
    TO authenticated
    USING ((SELECT auth.uid()) = id_author);

CREATE POLICY "Enable insert for users" ON public.notes
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- ===========================================
-- GRANTS
-- ===========================================

GRANT ALL ON TABLE public.roles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.statuses TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.posts TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.tags TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.post_tags TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.notes TO anon, authenticated, service_role;
