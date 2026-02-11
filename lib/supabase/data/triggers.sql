-- Triggers for Supabase database
-- Run this AFTER schema.sql, policies.sql, and seed.sql

-- ===========================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- ===========================================

-- Function to create profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    DECLARE
        username TEXT := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Anonymous');
        picture TEXT := COALESCE(NEW.raw_user_meta_data->>'picture', NEW.raw_user_meta_data->>'avatar_url', '/img/avatar.svg');
    BEGIN
        -- Insert into profiles table (id_role = 3 is 'member' by default)
        INSERT INTO public.profiles (id, id_role, email, username, avatar)
        VALUES (NEW.id, 3, NEW.email, username, picture);
    END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
