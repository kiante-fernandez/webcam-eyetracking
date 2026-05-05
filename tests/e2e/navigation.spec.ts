import { test, expect } from '@playwright/test';

const BASE_URL = '/webcam-eyetracking';

test.describe('Navigation', () => {
  test('should load home page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1').first()).toContainText('Webcam Eye-Tracking');
  });

  test('header Guides link scrolls to guides section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('nav a:has-text("Guides")').first().click();
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/?#guides$`));
    await expect(page.locator('#guides h2')).toContainText('Integration Guides');
  });

  test('header Paper link scrolls to paper section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('nav a:has-text("Paper")').first().click();
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/?#paper$`));
    await expect(page.locator('#paper h2')).toContainText('Companion Paper');
  });

  test('footer Integration Guides link scrolls to guides section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('footer a:has-text("Integration Guides")').first().click();
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/?#guides$`));
  });

  test('all five guide cards render', async ({ page }) => {
    await page.goto(BASE_URL);
    const guideTitles = ['jsPsych Integration', 'oTree Integration', 'PsychoPy Integration', 'Plain HTML Demo', 'Qualtrics Integration'];
    for (const title of guideTitles) {
      await expect(page.locator(`#guides h3:has-text("${title}")`)).toBeVisible();
    }
  });
});
