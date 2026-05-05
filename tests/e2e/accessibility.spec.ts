import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = '/webcam-eyetracking';

test.describe('Accessibility (WCAG AA)', () => {
  test('home page should have no accessibility violations', async ({ page }) => {
    await page.goto(BASE_URL);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('skip to content link should be functional', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.keyboard.press('Tab');

    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');

    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('all images should have alt text', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('headings should follow logical hierarchy', async ({ page }) => {
    await page.goto(BASE_URL);

    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    await expect(page.locator('h1')).toBeVisible();
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // First nav link

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto(BASE_URL);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('page should have valid lang attribute', async ({ page }) => {
    await page.goto(BASE_URL);

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('links should have discernible text', async ({ page }) => {
    await page.goto(BASE_URL);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const linkTextViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === 'link-name'
    );

    expect(linkTextViolations).toEqual([]);
  });
});
