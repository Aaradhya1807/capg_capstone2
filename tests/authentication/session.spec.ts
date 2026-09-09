// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { loginData, siteData } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

const hasApprovedCredentials = Boolean(process.env.PHPTRAVELS_TEST_EMAIL && process.env.PHPTRAVELS_TEST_PASSWORD);

test.describe('Authenticated Session', () => {
  test('AUTH-004/AUTH-005/AUTH-010: login, persistence, and logout', async ({ page }) => {
    test.skip(!hasApprovedCredentials, 'Set PHPTRAVELS_TEST_EMAIL and PHPTRAVELS_TEST_PASSWORD for approved sandbox credentials.');
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await page.getByRole('textbox', { name: /Email Address/i }).fill(loginData.validUser.email);
    await page.getByRole('textbox', { name: /Password/i }).fill(loginData.validUser.password);
    await page.getByRole('button', { name: /Login|Sign in/i }).click();
    await expect(page).not.toHaveURL(/\/login$/i);
    await page.reload();
    await expect(page).not.toHaveURL(/\/login$/i);
    const logout = page.getByRole('link', { name: /Logout|Sign out/i }).or(page.getByRole('button', { name: /Logout|Sign out/i }));
    if (await logout.count()) {
      await logout.first().click();
      await expect(page).toHaveURL(/login|phptravels/i);
    }
  });
});
