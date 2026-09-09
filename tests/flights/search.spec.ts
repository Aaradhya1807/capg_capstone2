// spec: specs/phptravels-test-plan.md
// data: test-data/phptravels-test-data.ts

import { test, expect } from '@playwright/test';
import { invalidFlightSearches, siteData, validFlightSearches } from '../../test-data/phptravels-test-data';
import { dismissDemoWarning } from '../helpers/phptravels';

test.describe('Flight Search', () => {
  test('FLT-001/FLT-002/FLT-003: flight search modes are available', async ({ page }) => {
    await page.goto(new URL(siteData.flightsPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    await expect(page.getByRole('button', { name: /One Way/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Round Trip/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Multi-City/i })).toBeVisible();
    await page.getByRole('button', { name: /Round Trip/i }).click();
    await page.getByRole('button', { name: /Multi-City/i }).click();
    await page.getByRole('button', { name: /One Way/i }).click();
    void validFlightSearches;
  });

  test('FLT-005/FLT-006: invalid flight criteria are rejected', async ({ page }) => {
    await page.goto(new URL(siteData.flightsPath, siteData.baseUrl).toString());
    await dismissDemoWarning(page);
    const search = page.getByRole('button', { name: /Search Flights|Search/i }).filter({ visible: true }).first();
    await search.click();
    await expect(page.locator('body')).toContainText(/required|origin|destination|date/i);
    await page.getByRole('button', { name: /Round Trip/i }).click();
    void invalidFlightSearches.returnBeforeDeparture;
    await expect(page.getByRole('button', { name: /Round Trip/i })).toBeVisible();
  });
});
