import { createClient } from '@/lib/supabase/server';

export default async function Index() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser().then((res) => res.data.user);
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="container">
        <h1 className="text-4xl">Testing</h1>
        <p>Next.js and Supabase test project</p>

        <pre>User: {user ? JSON.stringify(user, null, 2) : 'Unauthorized'}</pre>
      </div>
    </div>
  );
}
