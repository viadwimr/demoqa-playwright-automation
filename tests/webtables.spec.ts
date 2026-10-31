import { test, expect } from '@playwright/test';
import { readCsv } from '../utils/csvReader';
import { WebTablesPage, UserData } from '../pages/WebTablesPage';

test.describe('Web Tables - Bulk Insert Users', () => {
  test('should add all users from CSV and verify their records', async ({ page }) => {
    const users = readCsv<UserData>('data/users.csv');
    const webTablesPage = new WebTablesPage(page);

    await webTablesPage.open();

    for (const user of users) {
      await webTablesPage.addUser(user);
      await webTablesPage.verifyUserExists(user);
    }

    await expect(page.locator('table tbody tr')).toHaveCount(users.length + 3);

    await page.locator('.web-tables-wrapper').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  });
});