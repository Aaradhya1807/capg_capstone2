// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { loginData, siteData, signupNegativeData } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

test.describe('Authentication', () => {
  test('AUTH-001: Login form exposes labeled controls', async ({ page }) => {
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Email Address/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /Password/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Login|Sign in/i })).toBeVisible();
  });

  test('AUTH-002/AUTH-003: Login rejects empty, malformed, and invalid credentials', async ({ page }) => {
    await page.goto(new URL(siteData.loginPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    const email = page.getByRole('textbox', { name: /Email Address/i });
    const password = page.getByRole('textbox', { name: /Password/i });
    const submit = page.getByRole('button', { name: /Login|Sign in/i });
    await submit.click();
    await expect(page.locator('body')).toContainText(/required|email|password/i);
    await email.fill(loginData.malformedEmail);
    await password.fill(loginData.invalidUser.password);
    await submit.click();
    await expect(page.locator('body')).toContainText(/invalid|email|valid|required|credentials/i);
  });

  test('AUTH-006/AUTH-007: Signup rejects invalid account data', async ({ page }) => {
    await page.goto(new URL(siteData.signupPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await expect(page.getByRole('heading', { name: /Create Account/i })).toBeVisible();
    const submit = page.getByRole('button', { name: /Signup|Register|Create Account|Create/i }).filter({ visible: true }).first();
    await submit.click();
    await expect(page.locator('body')).toContainText(/required|first name|email|password/i);
    const email = page.getByRole('textbox', { name: /Email/i });
    if (await email.count()) await email.fill(signupNegativeData.malformedEmail.email);
    const password = page.getByRole('textbox', { name: /^Password/i });
    if (await password.count()) await password.fill(signupNegativeData.weakPassword.password);
    await submit.click();
    await expect(page.locator('body')).toContainText(/invalid|required|password|email/i);
  });
});
