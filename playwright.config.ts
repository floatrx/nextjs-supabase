// Load .env file
import { config } from 'dotenv';
import path from 'path';

import { defineConfig, devices } from '@playwright/test';
config({ path: path.resolve(__dirname, '.env') });

export const STORAGE_STATE = path.join(__dirname, 'tests/.auth/user.json');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    // Setup project - authenticates and saves state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // Tests that don't require auth
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /.*\.auth\.spec\.ts/,
    },
    // Tests that require auth - run after setup
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      testMatch: /.*\.auth\.spec\.ts/,
      dependencies: ['setup'],
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
