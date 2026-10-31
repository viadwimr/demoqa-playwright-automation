import { expect, Page } from '@playwright/test';
import { StudentRegistrationLocators } from '../locators/StudentRegistrationLocators';

export interface StudentData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  subjects: string[];
  hobbies: string[];
  picture: string;
  address: string;
  state: string;
  city: string;
}

export class StudentRegistrationPage {
  private locators: StudentRegistrationLocators;

  constructor(private page: Page) {
    this.locators = new StudentRegistrationLocators(page);
  }

  async open() {
    await this.page.goto('/automation-practice-form');
  }

  async fillForm(student: StudentData) {
    await this.locators.firstName.fill(student.firstName);
    await this.locators.lastName.fill(student.lastName);
    await this.locators.email.fill(student.email);
    await this.locators.mobile.fill(student.mobile);

    if (student.gender === 'Female') {
      await this.locators.genderFemale.click();
    } else {
      throw new Error(`Unsupported gender in this test: ${student.gender}`);
    }

    const dob = student.dateOfBirth;
    const formattedDate = `${dob.day} ${dob.month} ${dob.year}`;

    await this.locators.dateOfBirth.click();
    await this.locators.dateOfBirth.press('ControlOrMeta+A');
    await this.locators.dateOfBirth.fill(formattedDate);
    await this.locators.dateOfBirth.press('Enter');

    for (const subject of student.subjects) {
      await this.locators.subjectsInput.fill(subject);
      await this.page
        .locator('.subjects-auto-complete__option', { hasText: subject })
        .first()
        .click();
    }

    for (const hobby of student.hobbies) {
      if (hobby === 'Reading') {
        await this.locators.readingHobby.click();
      } else {
        throw new Error(`Unsupported hobby in this test: ${hobby}`);
      }
    }

    await this.locators.picture.setInputFiles(student.picture);

    await this.locators.address.fill(student.address);

    await this.locators.stateDropdown.click();
    await this.page.getByText(student.state, { exact: true }).last().click();

    await this.locators.cityDropdown.click();
    await this.page.getByText(student.city, { exact: true }).last().click();
  }

  async submitForm() {
    await this.locators.submitButton.click();
    await expect(this.locators.confirmationModal).toBeVisible();
  }

  async verifyConfirmation(student: StudentData) {
    const modal = this.locators.confirmationModal;

    await expect(modal).toContainText(
      `${student.firstName} ${student.lastName}`
    );
    await expect(modal).toContainText(student.email);
    await expect(modal).toContainText(student.gender);
    await expect(modal).toContainText(student.mobile);
    await expect(modal).toContainText(
      `${student.dateOfBirth.day} ${student.dateOfBirth.month},${student.dateOfBirth.year}`
    );
    for (const subject of student.subjects) {
      await expect(modal).toContainText(subject);
    }

    for (const hobby of student.hobbies) {
      await expect(modal).toContainText(hobby);
    }
    await expect(modal).toContainText(
      student.picture.split(/[\\/]/).pop() ?? student.picture
    );
    await expect(modal).toContainText(student.address);
    await expect(modal).toContainText(student.state);
    await expect(modal).toContainText(student.city);
  }
}