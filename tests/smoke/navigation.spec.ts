// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { siteData } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

test.describe('Smoke and Shared Navigation', () => {
  test('NAV-001/NAV-002: home page exposes core travel entry points', async ({ page }) => {
    await page.goto(siteData.baseUrl);
    await dismissDemoWarning(page);
    await expect(page).toHaveTitle(/PHPTRAVELS/i);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('button', { name: /Services/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Company/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^USD$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Signup/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Travel the way you love/i })).toBeVisible();
  });

  test('NAV-004/NAV-005: Services and Company menus open predictably', async ({ page }) => {
    await page.goto(siteData.baseUrl);
    await dismissDemoWarning(page);
    const services = page.getByRole('button', { name: /Services/i });
    await services.click();
    await expect(services).toBeVisible();
    await services.click();
    const company = page.getByRole('button', { name: /Company/i });
    await company.click();
    await expect(company).toBeVisible();
    await company.click();
  });
});
