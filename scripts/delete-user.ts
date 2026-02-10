/**
 * Delete a user and all related data from the database
 *
 * Usage:
 *   npx tsx scripts/delete-user.ts andrii.petsera@ensuria.com
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function deleteUser(email: string) {
  if (!email) {
    console.error('Usage: npx tsx scripts/delete-user.ts <email>');
    process.exit(1);
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Find user by email
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Error listing users:', listError.message);
    process.exit(1);
  }

  const user = users.users.find((u) => u.email === email);

  if (!user) {
    console.error(`User ${email} not found`);
    process.exit(1);
  }

  console.log(`Found user: ${user.email} (${user.id})`);

  // Delete related data first (due to foreign key constraints)
  console.log('Deleting user posts...');
  const { error: postsError } = await supabase.from('posts').delete().eq('id_author', user.id);
  if (postsError) console.warn('Posts deletion:', postsError.message);

  console.log('Deleting user notes...');
  const { error: notesError } = await supabase.from('notes').delete().eq('id_author', user.id);
  if (notesError) console.warn('Notes deletion:', notesError.message);

  console.log('Deleting user profile...');
  const { error: profileError } = await supabase.from('profiles').delete().eq('id', user.id);
  if (profileError) console.warn('Profile deletion:', profileError.message);

  // Delete auth user
  console.log('Deleting auth user...');
  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

  if (deleteError) {
    console.error('Error deleting user:', deleteError.message);
    process.exit(1);
  }

  console.log(`\n✅ User ${email} deleted successfully`);
}

deleteUser(process.argv[2]);
