import { Page } from '@playwright/test';

export async function dismissDemoWarning(page: Page): Promise<void> {
  const modal = page.locator('#demoWarningModal');
  try {
    await modal.waitFor({ state: 'visible', timeout: 2_000 });
  } catch {
    return;
  }

  const dismissButton = modal.getByRole('button', {
    name: /close|continue|got it|understood|ok|accept/i,
  });

  if (await dismissButton.count()) {
    await dismissButton.first().click();
  } else {
    await modal.locator('button').last().click();
  }

  await modal.waitFor({ state: 'hidden', timeout: 5_000 });
}
