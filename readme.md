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

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI Library**: HeroUI (React components)
- **Styling**: Tailwind CSS v4
- **Authentication**: Supabase Auth (OAuth + Email)
- **Database**: Supabase Postgres
- **Language**: TypeScript (strict mode)
- **Validation**: Zod + ZSA (Zod Server Actions)
- **Testing**: Playwright (E2E)
- **Code Quality**: ESLint 9, Prettier, Husky

## 📋 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm eslint` | Lint and fix code |
| `pnpm type:check` | Type check without emit |
| `pnpm type:build` | Type check with build mode (recommended) |
| `pnpm pretty` | Format code with Prettier |
| `pnpm gen:types` | Generate Supabase types |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:e2e:ui` | Run Playwright with UI |

## 🧪 E2E Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

### Test Structure

```
e2e/
├── .auth/           # Stored auth state
├── .results/        # Test artifacts
├── .report/         # HTML test reports
├── auth.setup.ts    # Authentication setup
├── auth.spec.ts     # Auth flow tests
├── blog.spec.ts     # Blog feature tests
├── navigation.spec.ts
└── notes.auth.spec.ts  # Tests requiring auth (*.auth.spec.ts)
```

### Running Tests

```bash
# Run all tests
pnpm test:e2e

# Run with UI mode
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e e2e/blog.spec.ts
```

### Test Configuration

- Tests requiring authentication use `*.auth.spec.ts` naming
- Auth state is saved to `e2e/.auth/user.json`
- Tests run against `http://localhost:3000`
- Dev server starts automatically

### Environment Variables for E2E

```env
E2E_TEST_EMAIL=your_test_email@example.com
E2E_TEST_PASSWORD=your_test_password
```

## 🏗️ Architecture Patterns

### Feature-Based Structure

Code is organized by feature in `/features/`:

```
features/
├── auth/
│   ├── actions/       # Server actions
│   ├── components/    # React components
│   └── validators/    # Zod schemas
├── post/
├── note/
├── tag/
└── storage/
```

### ZSA (Zod Server Actions)

Server actions use [ZSA](https://github.com/IdoPesok/zsa) for type-safe, validated server functions:

```typescript
// Public action
import { baseProcedure } from '@/lib/zsa/baseProcedure';

export const getPosts = baseProcedure
  .input(z.object({ limit: z.number().optional() }))
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('posts').select().limit(input.limit ?? 10);
  });

// Authenticated action
import { authedProcedure } from '@/lib/zsa/authedProcedure';

export const createPost = authedProcedure
  .input(PostSchema)
  .onSuccess(revalidatePosts)
  .handler(async ({ ctx, input }) => {
    return ctx.supabase.from('posts').insert(input);
  });
```

### HeroUI Integration

HeroUI components require client-side rendering. Import from the wrapper:

```typescript
// Always use this import (not @heroui/react directly)
import { Button, Input, Modal } from '@/lib/heroui';
```

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_NAME` | Yes | Application display name |
| `SUPABASE_PROJECT_ID` | Yes | Supabase project ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for OAuth redirects |
| `SUPABASE_DB_PASSWORD` | No | DB password (for init scripts) |
| `SUPABASE_DB_REGION` | No | DB region (for init scripts) |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Service role key (admin scripts) |
| `E2E_TEST_EMAIL` | No | Test user email (E2E tests) |
| `E2E_TEST_PASSWORD` | No | Test user password (E2E tests) |

## 🔧 Troubleshooting

### HeroUI Styles Not Loading (pnpm)

If styles aren't working with pnpm, ensure `@heroui/theme` is a direct dependency:

```bash
pnpm add @heroui/theme
```

This creates the symlink at `node_modules/@heroui/theme/` that Tailwind needs.

### ESLint Errors with Next.js 16

This project uses ESLint 9 flat config. If you see config errors:

1. Ensure `eslint.config.mjs` exists (not `.eslintrc`)
2. Use direct plugin imports (no `FlatCompat`)

### TypeScript Errors in Catch Blocks

With `useUnknownInCatchVariables: true`, handle errors properly:

```typescript
try {
  // ...
} catch (e) {
  const message = e instanceof Error ? e.message : 'Unknown error';
}
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## ✅ Code Quality

### Pre-commit Hooks

Husky runs these checks before each commit:

1. **TypeScript** - `tsc -b` type checking
2. **ESLint** - Lint and auto-fix staged files
3. **Prettier** - Format staged files
4. **E2E Tests** - Run Playwright tests

### Skipping Hooks (Emergency Only)

```bash
git commit --no-verify -m "emergency fix"
```

### Code Style

- Use `cn()` for class merging (from `@/lib/utils/cn`)
- Prefer `tailwind-variants` for component variants
- Separate type imports: `import type { X } from 'y'`
- Feature-based file organization

## Next.js 16 Migration

This project was migrated from Next.js 15 to Next.js 16. Key changes:

### Breaking Changes Addressed

- **Middleware → Proxy**: Renamed `middleware.ts` to `proxy.ts` and exported `proxy` function instead of `middleware`
- **Typed Routes**: Updated `PageProps` to use Next.js 16 typed routes syntax (`PageProps<'/blog/[slug]'>` instead of custom generic)
- **Client Component Boundaries**: Created `LinkComponent` wrapper for passing Next.js `Link` to HeroUI's `as` prop (functions can't be passed directly to Client Components in Next.js 16)

## 📂 Project Structure

```
.
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── (private)/        # Authenticated routes (notes, profile, blog management)
│   ├── api/              # API endpoints (auth callbacks, uploads)
│   └── blog/             # Public blog routes
├── components/
│   ├── guards/           # Auth guards (OnlyAuth, OnlyRole)
│   ├── icons/            # Icon components
│   ├── providers/        # React context providers
│   └── ui/               # Reusable UI components (form, layout, etc.)
├── config/               # App configuration (fonts, site metadata)
├── e2e/                  # Playwright E2E tests
│   ├── .auth/            # Stored auth state
│   ├── .results/         # Test artifacts
│   └── .report/          # HTML reports
├── features/             # Feature-based modules
│   ├── auth/             # Authentication (login, OAuth)
│   ├── note/             # Notes CRUD
│   ├── post/             # Blog posts CRUD
│   ├── storage/          # File uploads
│   ├── tag/              # Tags management
│   └── user/             # User profiles
├── lib/                  # Shared utilities
│   ├── heroui/           # HeroUI client wrapper
│   ├── next/             # Next.js helpers (metadata)
│   ├── rbac/             # Role-based access control
│   ├── supabase/         # Supabase client & helpers
│   ├── utils/            # General utilities (cn, etc.)
│   └── zsa/              # ZSA procedures (base, authed)
├── public/               # Static assets
├── styles/               # Global CSS, Tailwind config
├── supabase/             # Supabase migrations & config
└── types/                # TypeScript type definitions
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
