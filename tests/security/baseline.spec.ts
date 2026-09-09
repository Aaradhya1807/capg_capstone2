// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { securityProbeData, siteData } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

test.describe('Security Baseline', () => {
  test('SEC-001: public authentication pages use HTTPS and do not expose probes', async ({ page }) => {
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    expect(page.url()).toMatch(/^https:/);
    const email = page.getByRole('textbox', { name: /Email Address/i });
    await email.fill(securityProbeData.xss);
    await expect(email).toHaveValue(securityProbeData.xss);
    await expect(page.locator('body')).not.toContainText('alert("test")');
  });

  test('SEC-002: protected routes do not expose content without a session', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/booking history|my bookings/i);
  });
});
