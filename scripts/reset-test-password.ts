/**
 * Reset password for E2E test user
 *
 * Usage:
 *   npx tsx scripts/reset-test-password.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TEST_EMAIL = process.env.E2E_TEST_EMAIL;
const NEW_PASSWORD = process.env.E2E_TEST_PASSWORD || '123456';

async function resetPassword() {
  if (\!TEST_EMAIL) {
    console.error('E2E_TEST_EMAIL must be set in .env');
    process.exit(1);
  }

  if (\!SUPABASE_URL || \!SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    console.log('\\nGet your service_role key from Supabase Dashboard → Project Settings → API');
    console.log('\\nThen add to .env:');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your-key-here');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: users, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Error listing users:', listError.message);
    process.exit(1);
  }

  const user = users.users.find((u) => u.email === TEST_EMAIL);

  if (\!user) {
    console.error(`User ${TEST_EMAIL} not found`);
    process.exit(1);
  }

  console.log(`Found user: ${user.email} (${user.id})`);

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    password: NEW_PASSWORD,
  });

  if (updateError) {
    console.error('Error updating password:', updateError.message);
    process.exit(1);
  }

  console.log(`✅ Password reset to "${NEW_PASSWORD}" for ${TEST_EMAIL}`);
  console.log('\\nUpdate your .env:');
  console.log(`E2E_TEST_PASSWORD=${NEW_PASSWORD}`);
}

resetPassword();
