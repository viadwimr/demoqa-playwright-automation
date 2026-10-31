import { test } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';

test.describe('Droppable', () => {
  test('should drag the element into the target area', async ({ page }) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.open();
    await droppablePage.dragAndDrop();
    await droppablePage.verifyDropSuccess();
  });
});