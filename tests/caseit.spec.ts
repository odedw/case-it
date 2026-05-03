import { test, expect } from '@playwright/test';

test.describe('caseIt', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with title and header', async ({ page }) => {
    await expect(page).toHaveTitle('caseIt | For all of your casing needs');
    await expect(page.getByRole('banner').getByText('caseIt', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible();
  });

  test('UPPER CASE transforms text', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'UPPER CASE' }).click();
    await expect(textarea).toHaveValue('HELLO WORLD');
  });

  test('lower case transforms text', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('HELLO WORLD');
    await page.getByRole('button', { name: 'lower case' }).click();
    await expect(textarea).toHaveValue('hello world');
  });

  test('Pascal Case transforms text', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'Pascal Case' }).click();
    await expect(textarea).toHaveValue('Hello World');
  });

  test('camel Case transforms text', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'camel Case' }).click();
    await expect(textarea).toHaveValue('hello World');
  });

  test('keep spaces off removes spaces and collapses button labels', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    const checkbox = page.getByRole('checkbox', { name: 'keep spaces' });
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();

    // Button labels should now have no spaces
    await expect(page.getByRole('button', { name: 'PascalCase', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'camelCase', exact: true })).toBeVisible();

    // Pascal transform with no spaces
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'PascalCase', exact: true }).click();
    await expect(textarea).toHaveValue('HelloWorld');

    // Camel transform with no spaces
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'camelCase', exact: true }).click();
    await expect(textarea).toHaveValue('helloWorld');

    // Upper transform with no spaces
    await textarea.fill('hello world');
    await page.getByRole('button', { name: 'UPPERCASE', exact: true }).click();
    await expect(textarea).toHaveValue('HELLOWORLD');
  });

  test('Alt+3 keyboard shortcut applies Pascal Case', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.keyboard.press('Alt+3');
    await expect(textarea).toHaveValue('Hello World');
  });

  test('Alt+1 keyboard shortcut applies UPPER CASE', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.keyboard.press('Alt+1');
    await expect(textarea).toHaveValue('HELLO WORLD');
  });

  // On macOS, Option+1..4 doesn't produce "1".."4" — it produces special
  // characters (¡, ™, £, ¢). Simulate that to make sure our shortcut handler
  // keys off e.code (physical key) rather than e.key.
  test('Mac Option+digit shortcut still works when e.key is a special char', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    await textarea.fill('hello world');
    await page.evaluate(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: '£', // what Option+3 actually produces on a Mac US layout
          code: 'Digit3',
          altKey: true,
          bubbles: true,
        }),
      );
    });
    await expect(textarea).toHaveValue('Hello World');
  });

  test('About dialog opens, links to repo, and closes', async ({ page }) => {
    // Use attribute selector — getByRole filters out aria-hidden elements
    const dialog = page.locator('[aria-label="About caseIt"]');

    await expect(dialog).toHaveAttribute('aria-hidden', 'true');

    await page.getByRole('button', { name: 'About' }).click();
    await expect(dialog).toHaveAttribute('aria-hidden', 'false');

    await expect(dialog.getByRole('heading', { name: 'caseIt' })).toBeVisible();
    await expect(
      dialog.getByText(/keyboard-first tool for converting text/i),
    ).toBeVisible();

    const repoLink = dialog.getByRole('link', { name: /view on github/i });
    await expect(repoLink).toHaveAttribute('href', 'https://github.com/odedw/case-it');
    await expect(repoLink).toHaveAttribute('target', '_blank');

    // Full name should not appear anywhere in the dialog
    await expect(dialog.getByText(/Welgreen/)).toHaveCount(0);

    // Close via the X button
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  test('Copy event shows toast', async ({ page }) => {
    const textarea = page.getByRole('textbox', { name: 'Text to transform' });
    const toast = page.getByTestId('copy-toast');

    await expect(toast).toHaveCSS('opacity', '0');

    await textarea.fill('something to copy');
    await textarea.focus();
    // Trigger copy event directly — works regardless of host OS
    await textarea.evaluate((el: HTMLTextAreaElement) => {
      el.select();
      el.dispatchEvent(new ClipboardEvent('copy', { bubbles: true, cancelable: true }));
    });

    await expect(toast).toHaveCSS('opacity', '1');
    // Toast auto-hides after ~1.2s
    await expect(toast).toHaveCSS('opacity', '0', { timeout: 3000 });
  });
});
