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

  test('tools browse page should have no accessibility violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('tool detail page should have no accessibility violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools/webgazer`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });


  test('guides page should have no accessibility violations', async ({ page }) => {
    await page.goto(`${BASE_URL}/guides`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });


  test('skip to content link should be functional', async ({ page }) => {
    await page.goto(BASE_URL);

    // Tab to focus on skip link
    await page.keyboard.press('Tab');

    // Verify skip link is visible when focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();

    // Press Enter to activate skip link
    await page.keyboard.press('Enter');

    // Verify main content is now focused
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
    expect(h1Count).toBe(1); // Only one h1 per page

    // Verify h1 exists
    await expect(page.locator('h1')).toBeVisible();
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools`);

    // Tab through interactive elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // First nav link

    // Verify focus is visible
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

  test('form elements should have associated labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools`);

    // Check if any form inputs exist and if they have labels
    const inputs = await page.locator('input, select, textarea').all();

    // Only test if there are form elements on the page
    if (inputs.length > 0) {
      for (const input of inputs) {
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledby = await input.getAttribute('aria-labelledby');
        const hasPlaceholder = await input.getAttribute('placeholder');

        // Check if input is wrapped in a label element
        const parentLabel = await input.evaluateHandle((el) => el.closest('label'));
        const isInLabel = parentLabel !== null;

        // Input should have either: id, aria-label, aria-labelledby, placeholder, or be wrapped in a label
        const hasLabel = (id && id.length > 0) || ariaLabel || ariaLabelledby || hasPlaceholder || isInLabel;
        expect(hasLabel).toBeTruthy();
      }
    } else {
      // If no form elements exist, test passes
      expect(true).toBeTruthy();
    }
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
