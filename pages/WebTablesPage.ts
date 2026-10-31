import { expect, Page } from '@playwright/test';
import { WebTablesLocators } from '../locators/WebTablesLocators';

export interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  salary: string;
  department: string;
}

export class WebTablesPage {
  private locators: WebTablesLocators;

  constructor(private page: Page) {
    this.locators = new WebTablesLocators(page);
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

  async verifyUserExists(user: UserData) {
    const row = this.page.getByRole('row').filter({
      hasText: user.email
    });

    await expect(row).toBeVisible();
    await expect(row).toContainText(user.firstName);
    await expect(row).toContainText(user.lastName);
    await expect(row).toContainText(user.age);
    await expect(row).toContainText(user.email);
    await expect(row).toContainText(user.salary);
    await expect(row).toContainText(user.department);
  }
}