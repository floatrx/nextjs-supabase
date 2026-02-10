# Database Setup

SQL files to set up the Supabase database for this project.

## Quick Setup (Script)

1. Copy `.env.example` to `.env` and fill in your credentials
2. Run the init script:

```bash
./data/init-db.sh
```

## Manual Setup

Run these files in order in your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql):

1. **schema.sql** - Creates tables and indexes
2. **policies.sql** - Enables RLS and creates policies
3. **seed.sql** - Inserts lookup data (roles, statuses, sample tags)

## Storage Setup

Create a public bucket named `assets` for image uploads:

1. Go to Storage in your Supabase dashboard
2. Click "New bucket"
3. Name: `assets`
4. Enable "Public bucket"

## Auth Providers (Optional)

### GitHub OAuth

**1. Create GitHub OAuth App:**

- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Click "New OAuth App"
- Fill in:
  - **Application name**: Your app name
  - **Homepage URL**: `http://localhost:3000` (or your production URL)
  - **Authorization callback URL**: `https://<project-id>.supabase.co/auth/v1/callback`
- Click "Register application"
- Copy the **Client ID**
- Click "Generate a new client secret" and copy the **Client Secret**

**2. Configure in Supabase:**

- Go to [Authentication → Providers](https://supabase.com/dashboard/project/_/auth/providers)
- Find **GitHub** and enable it
- Paste your **Client ID** and **Client Secret**
- Save

### Google OAuth

**1. Create Google OAuth Credentials:**

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project (or select existing)
- Go to **APIs & Services → Credentials**
- Click **Create Credentials → OAuth client ID**
- If prompted, configure the OAuth consent screen first:
  - User Type: External
  - App name, email, etc.
  - Scopes: `email`, `profile`, `openid`
- Back to Credentials → Create OAuth client ID:
  - **Application type**: Web application
  - **Name**: Your app name
  - **Authorized JavaScript origins**:
    - `http://localhost:3000`
    - `https://<project-id>.supabase.co`
  - **Authorized redirect URIs**:
    - `https://<project-id>.supabase.co/auth/v1/callback`
- Click "Create" and copy **Client ID** and **Client Secret**

**2. Configure in Supabase:**

- Go to [Authentication → Providers](https://supabase.com/dashboard/project/_/auth/providers)
- Find **Google** and enable it
- Paste your **Client ID** and **Client Secret**
- Save

### Testing

After configuring providers, test login at `http://localhost:3000/login`

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
SUPABASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# For init script only
SUPABASE_DB_PASSWORD=your_database_password
SUPABASE_DB_REGION=aws-0-eu-west-1
```

Where to find:
- **Project ID**: From your project URL
- **Anon Key**: Project Settings → API → `anon` public key
- **DB Password**: The password you set when creating the project
- **DB Region**: Project Settings → Database → Connection string (e.g., `aws-0-eu-west-1`)
