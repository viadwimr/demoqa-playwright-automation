import { Page } from '@playwright/test';

export class WebTablesLocatorsAddition {
  constructor(private page: Page) {}

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  get firstNameInput() {
    return this.page.locator('#firstName');
  }

  get lastNameInput() {
    return this.page.locator('#lastName');
  }

  get ageInput() {
    return this.page.locator('#age');
  }

  get emailInput() {
    return this.page.locator('#userEmail');
  }

  get salaryInput() {
    return this.page.locator('#salary');
  }

  get departmentInput() {
    return this.page.locator('#department');
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  get registrationForm() {
    return this.page.locator('#userForm');
  }

  get searchInput() {
    return this.page.locator('#searchBox');
  }

  get tableRows() {
    return this.page.locator('table tbody tr');
  }

  get editButton() {
    return this.page.locator('[title="Edit"]');
  }

  get deleteButton() {
    return this.page.locator('[title="Delete"]');
  }
}