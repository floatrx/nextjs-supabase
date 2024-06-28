# Next.js, NextUI with Supabase

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Supabase](https://supabase.com/docs/reference/javascript)
- [MDXEditor](https://mdxeditor.dev/)
- [ZOD](https://zod.dev/)

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `bun`:

```bash
bun install # or bun i
```

### Run the development server

```bash
bun dev
```

## Next app router

### /(private)/\*

> Use this route group as a way to group routes
> that are only accessible to authenticated users.

- /blog
  - /create
  - /edit/[id]
- /notes

### /api routes

- `[GET]` `/api/auth/callback` – callback route for the OAuth providers;
- `[GET]` `/api/auth/confirm` – confirm the email OTP and redirect the user to the next page;
- `[DELETE]` `/api/posts` – delete a blog post by id;
- `[DELETE]` `/api/notes` – delete a note by id;
- `[POST]` `/upload` – upload an image to the supabase storage;

### Blog

- /blog/[slug] – view a blog post by slug;
- /blog – view all blog posts;

## Project Structure

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
