import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI || process.env.LIVE_SITE ? 1 : undefined,
  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
