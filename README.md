# Devsu QA Assessment - Automated Testing Framework

## Project Overview

This project provides an end-to-end (E2E) and API automation framework built with Cypress, designed according to industry good practices. The framework tests the complete purchase flow on the [Sauce Labs Demo Application](https://www.saucedemo.com/). As well, it includes API testing on the Petstore API (https://petstore.swagger.io/).

## Installation and Setup

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher
- A code editor such as Visual Studio Code

### Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/cwillromero/devsu-technical-assessment
cd devsu_assessment
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables (optional)

Environment variables are defined in the `env` object inside `cypress.config.js`. The default configuration is compatible with https://www.saucedemo.com/. To modify URLs for different environments, edit the `env` object in `cypress.config.js`.

4. Verify Cypress installation

```bash
npx cypress --version
```

Environment configuration is managed in `cypress.config.js` (`env` object).

## Project Structure

```
devsu_assessment/
├── cypress/
│   ├── e2e/
│   │   ├── purchase-flow.cy.js        Main E2E test suite
│   │   └── [other test files]
│   │
│   ├── api/
│   │   ├── api-requests.cy.js         API tests
│   │   ├── README.md
│   │   └── [other API tests]
│   │
│   ├── fixtures/
│   │   ├── test-data.json             Test data and scenarios
│   │   └── [other fixtures]
│   │
│   ├── support/
│   │   ├── commands.js                Custom commands
│   │   ├── e2e.js                     E2E configuration
│   │   └── pages/
│   │       ├── LoginPage.js           Login page object
│   │       ├── InventoryPage.js       Inventory page object
│   │       ├── CartPage.js            Cart page object
│   │       ├── CheckoutPage.js        Checkout page object
│   │       ├── ConfirmationPage.js    Confirmation page object
│   │       ├── index.js               Page objects export
│   │       └── README.md              POM documentation
│   │
│   └── [cypress configuration files]
│
├── cypress.config.js                  Main Cypress configuration
├── package.json                       Dependencies and scripts
└── README.md                          This file
```

## Test Execution

### npm Scripts

```bash
# Open Cypress Test Runner (Interactive UI)
npm run cy:open

# Run all E2E tests
npm run test:e2e

# Run E2E tests in headed mode (display browser)
npm run test:e2e:ui

# Run API tests
npm run test:api

# Run all tests (E2E + API)
npm run test:all
```

### Cypress Command Line

```bash
# Run specific test file
npx cypress run --spec "cypress/e2e/purchase-flow.cy.js"

# Run in headless mode
npx cypress run --headless

# Run with specific browser
npx cypress run --browser chrome

# Run with video recording
npx cypress run --record
```

---

## Architecture and Design Patterns

### Page Object Model (POM)

The framework implements the Page Object Model pattern, which provides:

- Encapsulation of page selectors and interactions
- Reusability across multiple tests
- Simplified maintenance when UI elements change
- Clear separation between test logic and implementation details

## Test Suite Overview

### Purchase Flow Tests

Located in `cypress/e2e/purchase-flow.cy.js`, the test suite includes the following scenarios:

#### Test 1: Successful Purchase with Default Products

- User authentication
- Addition of two products to cart
- Verification of cart contents
- Completion of checkout form
- Purchase finalization
- Validation of confirmation message

#### Test 2: Purchase with Alternative Products

- User authentication with same credentials
- Addition of different products
- Completion of purchase flow
- Validation of order confirmation

### API Tests

Located in `cypress/api/petstore.cy.js`, the API test suite validates backend functionality using the Petstore API. These tests verify:

- API endpoint accessibility and response status codes
- Data validation and response structure integrity
- Error handling and exception scenarios
- Request and response payload correctness

API tests are executed independently from UI tests and do not require browser interaction, enabling rapid validation of backend services.
