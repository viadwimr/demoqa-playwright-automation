import { expect, Page } from '@playwright/test';
import { WebTablesLocatorsAddition } from '../locators/WebTablesLocatorsAddition';

export interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  salary: string;
  department: string;
}

export class WebTablesPageAddition {
  private locators: WebTablesLocatorsAddition;

  constructor(private page: Page) {
    this.locators = new WebTablesLocatorsAddition(page);
  }

  async open() {
    await this.page.goto('/webtables', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
  }

  async addUser(user: UserData) {
    await this.locators.addButton.click();
    await expect(this.locators.registrationForm).toBeVisible();

    await this.locators.firstNameInput.fill(user.firstName);
    await this.locators.lastNameInput.fill(user.lastName);
    await this.locators.ageInput.fill(user.age);
    await this.locators.emailInput.fill(user.email);
    await this.locators.salaryInput.fill(user.salary);
    await this.locators.departmentInput.fill(user.department);

    await this.locators.submitButton.click();
    await expect(this.locators.registrationForm).toBeHidden();
  }

  async searchUserByEmail(email: string, expectedCount = 1) {
    await this.locators.searchInput.fill(email);
    await this.page.waitForTimeout(500);

    const matchingRows = this.locators.tableRows.filter({ hasText: email });
    await expect(matchingRows).toHaveCount(expectedCount);

    if (expectedCount > 0) {
      await expect(matchingRows.first()).toContainText(email);
    }
  }

  async editUserByEmail(email: string, updatedData: Partial<UserData>) {
    const matchingRow = this.locators.tableRows.filter({ hasText: email }).first();
    await expect(matchingRow).toBeVisible();

    const editButton = matchingRow.locator('[title="Edit"]');
    await editButton.click();
    await expect(this.locators.registrationForm).toBeVisible();

    if (updatedData.firstName) {
      await this.locators.firstNameInput.fill(updatedData.firstName);
    }
    if (updatedData.lastName) {
      await this.locators.lastNameInput.fill(updatedData.lastName);
    }
    if (updatedData.age) {
      await this.locators.ageInput.fill(updatedData.age);
    }
    if (updatedData.email) {
      await this.locators.emailInput.fill(updatedData.email);
    }
    if (updatedData.salary) {
      await this.locators.salaryInput.fill(updatedData.salary);
    }
    if (updatedData.department) {
      await this.locators.departmentInput.fill(updatedData.department);
    }

    await this.locators.submitButton.click();
    await expect(this.locators.registrationForm).toBeHidden();

    await expect(this.locators.tableRows.filter({ hasText: updatedData.email || email })).toBeVisible();
  }

  async deleteUserByEmail(email: string) {
    const matchingRow = this.locators.tableRows.filter({ hasText: email }).first();
    await expect(matchingRow).toBeVisible();

    const deleteButton = matchingRow.locator('[title="Delete"]');
    await deleteButton.click();

    await this.searchUserByEmail(email, 0);
  }
}