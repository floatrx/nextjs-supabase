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

- `/api/auth/callback` – callback route for the OAuth providers;
- `/api/auth/confirm` – confirm the email OTP and redirect the user to the next page;
- `/api/posts` – get all blog posts;
- `/api/post/[id]` – get a blog post by id;

### Blog

- /blog/[slug] – view a blog post by slug;
- /blog – view all blog posts;
