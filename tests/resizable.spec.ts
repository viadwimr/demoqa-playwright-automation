import { test, expect } from '@playwright/test';
import { ResizablePage } from '../pages/ResizablePage';

test.describe('Resizable', () => {
  test('should resize the element to 400 x 200 pixels', async ({ page }) => {
    const resizablePage = new ResizablePage(page);

    await resizablePage.open();
    await resizablePage.resizeTo(400, 200);

    const actualSize = await resizablePage.getSize();

    console.log('Actual resizable dimensions:', actualSize);

    expect(actualSize.width).toBe(400);
    expect(actualSize.height).toBe(200);
  });
});