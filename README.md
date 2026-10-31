# DemoQA – Playwright Automation Testing

Automated web testing project using **Playwright, TypeScript, and Page Object Model (POM)**, covering form submission, web tables, drag and drop, and resizable interactions.

The project covers four automation scenarios on the [DemoQA](https://demoqa.com/) website.

## Test Scenarios

| No. | Scenario | Description |
|---|---|---|
| 1 | Web Tables – Bulk Insert Users | Read user data from a CSV file, add each record to the Web Tables page, and verify the inserted records. |
| 2 | Droppable | Drag the draggable element into the target area and verify the successful drop. |
| 3 | Resizable | Resize the target element to 400 × 200 pixels and verify its dimensions. |
| 4 | Student Registration Form | Fill in and submit the registration form, then verify the confirmation details. |

## Tech Stack

- **Language:** TypeScript
- **Automation Framework:** Playwright
- **Design Pattern:** Page Object Model (POM)
- **Test Data:** Image, CSV and JSON
- **Test Reporting:** Playwright HTML Report
- **Browser:** Chromium

## Project Structure

```text
demoqa-playwright-automation/
├── data/
│   ├── profile-pic.jpg
│   ├── studentData.json
│   └── users.csv
├── locators/
│   ├── DroppableLocators.ts
│   ├── ResizableLocators.ts
│   ├── StudentRegistrationLocators.ts
│   └── WebTablesLocators.ts
├── pages/
│   ├── DroppablePage.ts
│   ├── ResizablePage.ts
│   ├── StudentRegistrationPage.ts
│   └── WebTablesPage.ts
├── tests/
│   ├── droppable.spec.ts
│   ├── resizable.spec.ts
│   ├── student-registration.spec.ts
│   └── webtables.spec.ts
├── utils/
│   └── csvReader.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/viadwimr/demoqa-playwright-automation.git
```

2. Navigate to the project directory:

```bash
cd demoqa-playwright-automation
```

3. Install dependencies:

```bash
npm install
```

4. Install the Chromium browser:

```bash
npx playwright install chromium
```

## Running the Tests

Run all test scenarios:

```bash
npm test
```

Run all test scenarios with the browser visible (headed mode):

```bash
npx playwright test --headed
```

Alternatively, use the configured npm script:

```bash
npm run test:headed
```

Run individual scenarios:

```bash
npm run test:webtables
npm run test:droppable
npm run test:resizable
npm run test:student
```

## Test Report

Generate and open the Playwright HTML Report:

```bash
npx playwright show-report
```

Alternatively, use the configured npm script:

```bash
npm run report
```

The Playwright configuration captures:

- **Videos:** Recorded for all test executions.
- **Screenshots:** Captured when a test fails.
- **Traces:** Retained when a test fails.

The HTML report is generated in the `playwright-report/` directory. Test execution artifacts are stored in the `test-results/` directory.

## Test Data

Test data is stored separately from the test scripts:

- `data/profile-pic.jpg` – Image file used for the Student Registration Form upload scenario.
- `data/studentData.json` – Student registration form data.
- `data/users.csv` – Official CSV test data provided for the Web Tables bulk insertion scenario.

## Author

**Via Dwi Miftakhur Rochma**

Software Quality Assurance Engineer