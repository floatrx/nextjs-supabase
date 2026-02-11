# 📝 Nextjs, HeroUI with Supabase

## 📸 Screenshots
![Screenshot 1](public/screenshots/scr-auth.png)
![Screenshot 2](public/screenshots/scr-1.png)
![Screenshot 2](public/screenshots/scr-2.png)
![Screenshot 2](public/screenshots/scr-editor.png)

> A modern fullstack Next.js + Supabase application for managing Notes, Blog Posts, and User Profiles with Tags and Media Uploads.

## 🛠️ Installation

```bash
# Install dependencies
pnpm install

# Create .env file
cp .env.example .env

# Configure environment variables inside .env

# Run development server
pnpm dev
```

[Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) is required to run the database locally. You can install it using the following .
```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Upgrade (if already installed)
brew upgrade supabase

# Login
supabase login

# Press enter to open the browser and login to your Supabase account
# paste the OTP code into the terminal

# Try to run the command
pnpm gen:types
```

## Database Setup

See [lib/supabase/data/README.md](lib/supabase/data/README.md) for database schema, triggers, policies, and seed data.

## Admin Scripts

Scripts for database administration are located in `lib/supabase/scripts/`:
- `delete-user.ts` — Delete a user and their related data
- `reset-test-password.ts` — Reset E2E test user password

## Technologies Used

- [Next.js 16](https://nextjs.org/docs/getting-started)
- [HeroUI](https://www.heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Supabase](https://supabase.com/docs/reference/javascript)
- [MDXEditor](https://mdxeditor.dev/)
- [ZOD](https://zod.dev/)

## ✨ Features

- 🔥 Authentication (Supabase OAuth / Email)
- 📝 Create and manage Notes
- 📰 Create, edit, delete Blog Posts
- 🏷️ Tags management
- 📂 Upload and manage images
- 👤 User Profile update
- 🎨 TailwindCSS UI
- ⚡ Fast and typed APIs (TypeScript + Zod)
- 🧹 Linting (ESLint, Prettier, Husky hooks)

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Authentication**: Supabase
- **Database**: Supabase Postgres
- **Language**: TypeScript
- **Validation**: Zod
- **Code Quality**: ESLint, Prettier, Husky

## Next.js 16 Migration

This project was migrated from Next.js 15 to Next.js 16. Key changes:

### Breaking Changes Addressed

- **Middleware → Proxy**: Renamed `middleware.ts` to `proxy.ts` and exported `proxy` function instead of `middleware`
- **Typed Routes**: Updated `PageProps` to use Next.js 16 typed routes syntax (`PageProps<'/blog/[slug]'>` instead of custom generic)
- **Client Component Boundaries**: Created `LinkComponent` wrapper for passing Next.js `Link` to HeroUI's `as` prop (functions can't be passed directly to Client Components in Next.js 16)

### Files Changed

| File | Change |
|------|--------|
| `proxy.ts` | New file (renamed from `middleware.ts`), handles OAuth PKCE code redirect |
| `global.d.ts` | Removed custom `PageProps` type (now provided by Next.js) |
| `components/ui/link/LinkComponent.tsx` | New client wrapper for `Link` component |
| `app/page.tsx`, `app/login/page.tsx`, `app/blog/[slug]/page.tsx`, `app/(private)/blog/edit/[id]/page.tsx` | Updated to use typed route `PageProps` |
| `features/*/components/*.tsx` | Updated `as={Link}` to `as={LinkComponent}` |

### New Environment Variable

- `NEXT_PUBLIC_SITE_URL` — Production site URL for OAuth redirects (required for custom domains)

## 📂 Project Structure

```
.
├── app (API routes, pages and layouts)
├── components (components grouped by purpose: form, ui, etc.)
├── config (configuration files, constants etc.)
├── hooks (custom react hooks)
├── lib (utility functions: next, api, supabase, zod, etc.)
├── public (public assets)
├── server (server-side logic: actions, services, etc.)
├── styles (global styles, tailwind config)
├── types (typescript types grouped by entity or purpose)
└── validators (entity validators using zod)
```

## Next app router

### /(private)/\*

> Use this route group as a way to group routes
> that are only accessible to authenticated users.
```
- login
- /blog
  - /create
  - /edit/[id]
- /notes
- profile
- tags
```

### /api routes

- `[GET]` `/api/auth/callback` – callback route for the OAuth providers;
- `[GET]` `/api/auth/confirm` – confirm the email OTP and redirect the user to the next page;
- `[DELETE]` `/api/posts` – delete a blog post by id;
- `[DELETE]` `/api/notes` – delete a note by id;
- `[POST]` `/upload` – upload an image to the supabase storage;

### Blog

- /blog/[slug] – view a blog post by slug;
- /blog – view all blog posts;

## Server-Side Interaction Approaches

In the application, interaction with the server-side can be managed through two primary methods: server-actions and browser requests to API
endpoints. Each method leverages the `entityService` as an entry point, ensuring consistency in how data is managed and operations are
performed.

#### 1. Using Server-Actions (e.g. `server/actions/post.ts`)

Server-actions are methods defined on the server that directly handle the lifecycle of requests—from parsing data to calling service methods
and formatting responses. This approach is considered the default and recommended for its ability to tightly integrate with server logic and
services.

**Example Usage:**

```tsx
import { postCreate, postUpdate } from '@/server/actions/post';

const DummyExample = () => {
  const [response, formAction] = useFormState(action, { statusText: '', status: 0, data: null });
  return (
    <Form action={formAction}>
      <Submit />
    </Form>
  );
};
```

#### Advantages:

- Direct access to server resources and services.
- Efficient handling of data validation and transformation.
- Consolidated error handling and response formatting.

#### 2. Using Browser Requests to API Endpoints (e.g. `app/api/posts/route.ts`)

Browser requests are a simpler and more straightforward method where the frontend sends HTTP requests directly to defined API endpoints.
These endpoints parse the requests, perform operations via the entity services, and send back the responses.

**Example Usage:**

```tsx
import { useApi } from '@/hooks/useApi';

export const DeletePostButton = ({ id }: TPostId) => {
  const [deletePost, pending] = useApi<TPostId>('delete', 'posts');
  return (
    <Button isLoading={pending} onClick={() => deletePost({ id })}>
      <Trash />
    </Button>
  );
};
```

#### Features:

- Less code, ideal for simple CRUD operations.
- Supports all HTTP methods.
- Manages request states using React's useTransition for smooth user experiences.
- Automatically refreshes components or pages upon request completion.

#### Summary

Both methods, server-actions and browser requests, are effective for interacting with the server-side but cater to different needs and
complexities in application architecture. Server-actions offer more robust handling at the cost of tighter coupling, while browser requests
provide flexibility and simplicity, ideal for scenarios where rapid development and deployment are prioritized.


Made with ❤️ by [floatrx].
