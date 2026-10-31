import { test } from '@playwright/test';
import { StudentRegistrationPage, StudentData } from '../pages/StudentRegistrationPage';
import studentData from '../data/studentData.json';

test.describe('Student Registration Form', () => {
  test('should submit the form and verify confirmation details', async ({ page }) => {
    const registrationPage = new StudentRegistrationPage(page);

    await registrationPage.open();
    await registrationPage.fillForm(studentData as StudentData);
    await registrationPage.submitForm();
    await registrationPage.verifyConfirmation(studentData as StudentData);
  });
});