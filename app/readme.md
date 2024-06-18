## (Private) Directory
> Use this route group as a way to group routes 
that are only accessible to authenticated users.
- /blog
  - /create
  - /edit/[id]
- /notes

## /api Routes
- `auth/callback` – callback route for the OAuth providers;
- `auth/confirm` – confirm the email OTP and redirect the user to the next page;
