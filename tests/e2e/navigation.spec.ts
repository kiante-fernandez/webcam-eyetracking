import { test, expect } from '@playwright/test';

const BASE_URL = '/webcam-eyetracking';

test.describe('Navigation', () => {
  test('should load home page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1').first()).toContainText('Webcam Eye-Tracking');
  });

  test('should navigate to tools page', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('text=Browse Tools');
    await expect(page).toHaveURL(`${BASE_URL}/tools`);
    await expect(page.locator('h1').first()).toContainText('Browse Eye-Tracking Tools');
  });

  test('should navigate to a tool detail page', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools`);
    await page.click('text=WebGazer.js');
    await expect(page).toHaveURL(/\/tools\/webgazer/);
    await expect(page.locator('h1').first()).toContainText('WebGazer.js');
  });


  test('should navigate to guides page', async ({ page }) => {
    await page.goto(BASE_URL);
    const navLink = page.locator('nav a:has-text("Guides")').first();
    await navLink.click();
    await expect(page).toHaveURL(`${BASE_URL}/guides`);
    await expect(page.locator('h1').first()).toContainText('Integration Guides');
  });


  test('should have working footer links', async ({ page }) => {
    await page.goto(BASE_URL);
    const footerLink = page.locator('footer a:has-text("Browse Tools")').first();
    await footerLink.click();
    await expect(page).toHaveURL(`${BASE_URL}/tools`);
  });
});
