import type { AuthServiceViaEmailAction, TCredentials } from '@/types/auth';
import type { SignInWithOAuthCredentials, VerifyOtpParams } from '@supabase/auth-js';

import { createServerClient } from '@/lib/supabase/server';

/**
 * Auth service
 * - signInWithOAuth
 * - viaEmail
 * - exchangeCode
 * - verifyOtp
 * - getUser
 * - signOut
 */
export const authService = {
  /**
   * Sign in with OAuth
   * @param {SignInWithOAuthCredentials} credentials - The OAuth credentials
   */
  async signInWithOAuth(credentials: SignInWithOAuthCredentials) {
    const supabase = await createServerClient();

    return supabase.auth.signInWithOAuth(credentials);
  },

  /**
   * Sign in or sign up via email
   * @param {AuthServiceViaEmailAction} action - The action to perform (sign in or sign up)
   * @param {TCredentials} credentials - The user's credentials
   */
  async viaEmail(action: AuthServiceViaEmailAction, credentials: TCredentials) {
    const supabase = await createServerClient();

    return supabase.auth[action](credentials);
  },

  /**
   * Exchange code for session
   * @param {string} code - The code to exchange
   */
  async exchangeCode(code: string) {
    const supabase = await createServerClient();

    return supabase.auth.exchangeCodeForSession(code);
  },

  /**
   * Verify OTP
   * @param {VerifyOtpParams} params - The OTP parameters
   */
  async verifyOtp(params: VerifyOtpParams) {
    const supabase = await createServerClient();

    return supabase.auth.verifyOtp(params);
  },

  /**
   * Get user
   */
  async getUser() {
    const supabase = await createServerClient();

    return supabase.auth.getUser().then(({ data }) => data.user);
  },

  /**
   * Sign out
   */
  async signOut() {
    const supabase = await createServerClient();

    return supabase.auth.signOut();
  },
};
