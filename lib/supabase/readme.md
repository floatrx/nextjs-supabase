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

### Tables 
```sql
CREATE TABLE public.posts (
    id integer NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    content text DEFAULT ''::text NOT NULL,
    slug text DEFAULT ''::text NOT NULL,
    id_author uuid DEFAULT auth.uid() NOT NULL,
    published_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    updated_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    is_published boolean DEFAULT false NOT NULL,
    seo_title text,
    seo_description text,
    thumbnail text
);

CREATE TABLE public.notes (
    id bigint NOT NULL,
    title text,
    id_author uuid DEFAULT auth.uid(),
    is_done boolean,
    id_status smallint DEFAULT '1'::smallint
);

CREATE TABLE public.post_tags (
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    id_role smallint DEFAULT '1'::smallint NOT NULL,
    username text DEFAULT ''::text NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    avatar text DEFAULT ''::text NOT NULL,
    updated_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL
);

CREATE TABLE public.roles (
    id smallint NOT NULL,
    name character varying(255) NOT NULL
);

CREATE TABLE public.statuses (
    id smallint NOT NULL,
    name text
);
```
