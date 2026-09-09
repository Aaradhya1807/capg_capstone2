// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { siteData, viewportData } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

test.describe('Accessibility and Responsive Behavior', () => {
  test('A11Y-001: primary navigation is keyboard accessible', async ({ page }) => {
    await page.goto(siteData.baseUrl);
    await dismissDemoWarning(page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('A11Y-002: Login inputs have accessible names', async ({ page }) => {
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await expect(page.getByRole('textbox', { name: /Email Address/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Password/i })).toBeVisible();
  });

  test('A11Y-003: home page remains usable at supported narrow viewports', async ({ page }) => {
    for (const viewport of [viewportData.mobile, viewportData.mobileNarrow]) {
      await page.setViewportSize(viewport);
      await page.goto(siteData.baseUrl);
      await dismissDemoWarning(page);
      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('heading', { name: /Travel the way you love/i })).toBeVisible();
    }
  });
});
