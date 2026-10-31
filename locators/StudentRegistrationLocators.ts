import { Page } from '@playwright/test';

export class StudentRegistrationLocators {
  constructor(private page: Page) {}

  get firstName() {
    return this.page.locator('#firstName');
  }

  get lastName() {
    return this.page.locator('#lastName');
  }

  get email() {
    return this.page.locator('#userEmail');
  }

  get genderFemale() {
    return this.page.locator('label[for="gender-radio-2"]');
  }

  get mobile() {
    return this.page.locator('#userNumber');
  }

  get dateOfBirth() {
    return this.page.locator('#dateOfBirthInput');
  }

  get subjectsInput() {
    return this.page.locator('#subjectsInput');
  }

  get readingHobby() {
    return this.page.locator('label[for="hobbies-checkbox-2"]');
  }

  get picture() {
    return this.page.locator('#uploadPicture');
  }
  
  get address() {
    return this.page.locator('#currentAddress');
  }

  get stateDropdown() {
    return this.page.locator('#state');
  }

  get cityDropdown() {
    return this.page.locator('#city');
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  get confirmationModal() {
    return this.page.locator('.modal-content');
  }
}