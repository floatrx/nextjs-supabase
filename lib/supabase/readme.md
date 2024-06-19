# Supabase notes

### Sync profiles table with auth.users

- fixed version (tested with github auth)

```plpgsql
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Log all data in NEW * (for debug / optional)
    RAISE LOG 'Logged handle_new_user: %', to_jsonb(NEW.*);

    DECLARE
        username TEXT := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Default Username');
        picture TEXT := COALESCE(NEW.raw_user_meta_data->>'picture', NEW.raw_user_meta_data->>'avatar_url', '/img/avatar.svg');
    BEGIN
        -- Insert into profiles table
        INSERT INTO public.profiles (id, id_role, email, username, avatar)
        VALUES (NEW.id, 1, NEW.email, username, picture);
    END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enable row level security on the profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create the trigger on the users table
DROP TRIGGER IF EXISTS on_auth_user_created ON public.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

### RLS

Role: `supabase_auth_admin`

```plpgsql
alter policy "Enable insert for specific users only"
on "public"."profiles"
to anon, authenticated, supabase_auth_admin
with check (
  true
);
```
