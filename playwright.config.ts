import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'; 

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test', // SauceDemo uses data-test instead of data-testid
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: process.env.VIDEO ? 'on' : 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
