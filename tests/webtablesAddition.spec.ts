import { expect, test } from '@playwright/test';
import { readCsv } from '../utils/csvReader';
import { UserData, WebTablesPageAddition } from '../pages/WebTablesPageAddition';

test.describe('Web Tables', () => {
  let webTablesPage: WebTablesPageAddition;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPageAddition(page);
  });

  test.describe('Search', () => {
    test('should add CSV users and search exact, partial, and negative values', async ({ page }) => {
      const users = readCsv<UserData>('data/usersAddition.csv');
      const existingEmails = new Set(['cierra@example.com', 'alden@example.com', 'kierra@example.com']);
      const availableUsers = users.filter(user => !existingEmails.has(user.email.toLowerCase()));

      await webTablesPage.open();
      await page.locator('.web-tables-wrapper').scrollIntoViewIfNeeded();

      const randomUserIndex = Math.floor(Math.random() * availableUsers.length);
      const randomUser = availableUsers[randomUserIndex];

      await webTablesPage.addUser(randomUser);

      await webTablesPage.searchUserByEmail(randomUser.email);

      const minPartialLength = 5;
      const maxStart = Math.max(0, randomUser.email.length - minPartialLength);
      const start = Math.floor(Math.random() * (maxStart + 1));
      const end = start + Math.min(
        randomUser.email.length - start,
        minPartialLength + Math.floor(Math.random() * (randomUser.email.length - start - minPartialLength + 1))
      );
      const partialKeyword = randomUser.email.slice(start, end);

      await webTablesPage.searchUserByEmail(partialKeyword, 1);

      const negativeEmail = `no-match-${Date.now()}@demoqa.com`;
      await webTablesPage.searchUserByEmail(negativeEmail, 0);
    });
  });

  test.describe('Edit User', () => {
    test('should edit an existing user', async ({ page }) => {
      await webTablesPage.open();
      await webTablesPage.editUserByEmail('cierra@example.com', { firstName: 'CierraUpdated' });
    });
  });

  test.describe('Delete User', () => {
    test('should delete an existing user', async ({ page }) => {
      await webTablesPage.open();
      await webTablesPage.deleteUserByEmail('cierra@example.com');
    });
  });

  test.describe('Pagination', () => {
    test('should navigate first, prev, next, and last pages', async ({ page }) => {
      const users = readCsv<UserData>('data/usersAddition.csv');

      await webTablesPage.open();

      for (const user of users.slice(0, 12)) {
        await webTablesPage.addUser(user);
      }

      const firstPage = page.getByRole('button', { name: 'First' });
      const prevPage = page.getByRole('button', { name: 'Previous' });
      const nextPage = page.getByRole('button', { name: 'Next' });
      const lastPage = page.getByRole('button', { name: 'Last' });
      const paginationText = page.locator('.pagination');

      await expect(paginationText).toContainText('Page 1 of 2');
      await expect(nextPage).toBeEnabled();
      await expect(lastPage).toBeEnabled();
      await expect(prevPage).toBeDisabled();
      await expect(firstPage).toBeDisabled();

      await nextPage.click();
      await expect(paginationText).toContainText('Page 2 of 2');
      await expect(prevPage).toBeEnabled();
      await expect(firstPage).toBeEnabled();

      await prevPage.click();
      await expect(paginationText).toContainText('Page 1 of 2');

      await lastPage.click();
      await expect(paginationText).toContainText('Page 2 of 2');

      await firstPage.click();
      await expect(paginationText).toContainText('Page 1 of 2');
    });
  });

  test.describe('Rows per Page', () => {
    test('should change and verify rows shown per page', async ({ page }) => {
      const users = readCsv<UserData>('data/usersAddition.csv');

      await webTablesPage.open();

      for (const user of users.slice(0, 12)) {
        await webTablesPage.addUser(user);
      }

      const rowsPerPageSelect = page.locator('select');
      await rowsPerPageSelect.selectOption('10');
      await expect(page.locator('table tbody tr')).toHaveCount(10);

      await rowsPerPageSelect.selectOption('20');
      await expect(page.locator('table tbody tr')).toHaveCount(13);
    });
  });
});