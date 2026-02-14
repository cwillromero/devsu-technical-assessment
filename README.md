# Devsu QA Assessment - Automated Testing Framework

[![Cypress](https://img.shields.io/badge/Cypress-15.10.0-brightgreen)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📋 Project Overview

This is a professional **end-to-end (E2E) automation framework** built with Cypress following **industry best practices**. The framework is designed to test the complete purchase flow on the [Sauce Labs Demo Application](https://www.saucedemo.com/).

### Key Features

- ✅ **Page Object Model (POM)** - Clean, maintainable test architecture
- ✅ **Test Data Fixtures** - Centralized test data management
- ✅ **Modular Structure** - Separated concerns (pages, commands, fixtures)
- ✅ **Professional Documentation** - JSDoc comments throughout
- ✅ **Scalable Design** - Ready for API and component tests
- ✅ **Best Practices** - Follows Cypress and QA industry standards

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd devsu_assessment
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment** (optional)

- Environment variables are defined in the `env` object inside `cypress.config.js`
- Default configuration works with https://www.saucedemo.com/
- Edit the `env` object in `cypress.config.js` to change URLs for different environments

4. **Verify Cypress installation**

```bash
npx cypress --version
```

**Note:** Environment configuration is managed in `cypress.config.js` (`env` object).

---

## 📁 Project Structure

```
devsu_assessment/
├── cypress/
│   ├── e2e/
│   │   ├── purchase-flow.cy.js        # ✅ Main E2E test suite
│   │   └── [other test files]
│   │
│   ├── api/
│   │   ├── api-requests.cy.js         # 📡 API tests (placeholder)
│   │   ├── README.md
│   │   └── [other API tests]
│   │
│   ├── fixtures/
│   │   ├── test-data.json             # 📊 Test data & scenarios
│   │   └── [other fixtures]
│   │
│   ├── support/
│   │   ├── commands.js                # 🔧 Custom commands
│   │   ├── e2e.js                     # ⚙️ E2E configuration
│   │   └── pages/
│   │       ├── LoginPage.js           # 🔐 Login page object
│   │       ├── InventoryPage.js       # 📦 Inventory page object
│   │       ├── CartPage.js            # 🛒 Cart page object
│   │       ├── CheckoutPage.js        # 💳 Checkout page object
│   │       ├── ConfirmationPage.js    # ✅ Confirmation page object
│   │       ├── index.js               # 🔗 Page objects export
│   │       └── README.md              # 📖 POM documentation
│   │
│   └── [cypress configuration files]
│
├── cypress.config.js                  # 🎛️ Main Cypress configuration
├── package.json                       # 📦 Dependencies & scripts
└── README.md                          # 📄 This file
```

---

## 🧪 Test Execution

### Available Scripts

```bash
# Open Cypress Test Runner (Interactive UI)
npm run cy:open

# Run all E2E tests
npm run test:e2e

# Run E2E tests with headed mode (see browser)
npm run test:e2e:ui

# Run API tests
npm run test:api

# Run all tests (E2E + API)
npm run test:all
```

### Using Cypress Command Line

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

## 🏗️ Architecture & Design Patterns

### Page Object Model (POM)

The framework implements the **Page Object Model** pattern, which provides:

- **Encapsulation** of page selectors and interactions
- **Reusability** across multiple tests
- **Easy maintenance** when UI changes
- **Clear separation** of test logic and implementation details

#### Example Usage

```javascript
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  ConfirmationPage,
} from '../support/pages/index';

describe('Purchase Flow', () => {
  it('Should complete purchase successfully', () => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');

    InventoryPage.addProductToCart('Sauce Labs Backpack');
    InventoryPage.goToShoppingCart();

    CartPage.proceedToCheckout();
    CheckoutPage.proceedToStepTwo('John', 'Doe', '12345');
    CheckoutPage.finishPurchase();

    ConfirmationPage.verifyConfirmationMessage('THANK YOU FOR YOUR ORDER');
  });
});
```

### Test Data Management

Test data is centralized in **JSON fixtures** for easy management and reusability:

```javascript
// cypress/fixtures/test-data.json
{
  "users": { ... },
  "customers": { ... },
  "products": { ... },
  "messages": { ... }
}
```

**Usage in tests:**

```javascript
cy.fixture('test-data').then((testData) => {
  const username = testData.users.standard.username;
  // Use test data in your test
});
```

### Configuration Management

Environment variables are defined in the `env` object of `cypress.config.js` (this project uses the config file as the source of truth):

```javascript
// cypress.config.js
module.exports = defineConfig({
  env: {
    E2E_BASE_URL: 'https://www.saucedemo.com/',
    API_BASE_URL: 'https://api.example.com/',
  },
  e2e: {
    /* ... */
  },
});
```

Access values in tests via `Cypress.env('API_BASE_URL')` or rely on `cy.visit('/')` which uses the configured `baseUrl`.

---

## 📊 Test Suite Overview

### Purchase Flow Tests (`cypress/e2e/purchase-flow.cy.js`)

#### Test 1: Successful Purchase with Default Products

- ✅ Authenticates user
- ✅ Adds two products to cart
- ✅ Verifies cart contents
- ✅ Completes checkout form
- ✅ Finalizes purchase
- ✅ Validates confirmation message

#### Test 2: Purchase with Alternative Products

- ✅ Authenticates user with same credentials
- ✅ Adds different products
- ✅ Completes purchase flow
- ✅ Validates order confirmation

---

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Node event listeners
    },
  },

  env: {
    E2E_BASE_URL: 'https://www.saucedemo.com/',
    API_BASE_URL: 'https://api.example.com/',
  },
});
```

### Environment-Specific Configuration

To use different environments, update `cypress.config.js`:

```javascript
// Development
E2E_BASE_URL: 'https://dev.saucedemo.com/';

// Staging
E2E_BASE_URL: 'https://staging.saucedemo.com/';

// Production
E2E_BASE_URL: 'https://www.saucedemo.com/';
```

---

## ✍️ Creating New Tests

### Step 1: Create Test File

Create a new file in `cypress/e2e/` named `your-feature.cy.js`

### Step 2: Import Page Objects

```javascript
import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  ConfirmationPage,
} from '../support/pages/index';
```

### Step 3: Write Test

```javascript
describe('Your Test Suite', () => {
  let testData;

  before(() => {
    cy.fixture('test-data').then((data) => {
      testData = data;
    });
  });

  it('Should test a specific feature', () => {
    // Arrange
    LoginPage.visit();

    // Act
    LoginPage.login(
      testData.users.standard.username,
      testData.users.standard.password
    );

    // Assert
    InventoryPage.verifyInventoryPageIsDisplayed();
  });
});
```

### Step 4: Add Test Data (if needed)

Update `cypress/fixtures/test-data.json`:

```json
{
  "newFeature": {
    "data1": "value1",
    "data2": "value2"
  }
}
```

---

## 📝 Test Data Structure

### Test Data File: `cypress/fixtures/test-data.json`

```json
{
  "users": {
    "standard": {
      "username": "standard_user",
      "password": "secret_sauce"
    }
  },
  "customers": {
    "customer1": {
      "firstName": "John",
      "lastName": "Doe",
      "postalCode": "12345"
    }
  },
  "products": {
    "backpack": "Sauce Labs Backpack",
    "bikeLight": "Sauce Labs Bike Light"
  },
  "messages": {
    "orderConfirmation": "THANK YOU FOR YOUR ORDER"
  }
}
```

---

## 🛠️ Custom Commands

Custom Cypress commands are available in `cypress/support/commands.js`, but most functionality is encapsulated in **Page Objects** following the POM pattern.

### Why Page Objects Instead of Commands?

With Page Object Model:

```javascript
// ✅ Clear, Self-Documenting
LoginPage.login('username', 'password');
InventoryPage.addProductToCart('Backpack');

// ❌ Less Maintainable
cy.login('username', 'password');
cy.addProductToCart('Backpack');
```

**Advantages:**

- Page Objects handle all selectors and interactions
- Changes to UI only require updating one Page Object
- Tests are more readable and maintainable
- Easy to extend and debug

### Adding Custom Commands (if needed)

```javascript
// cypress/support/commands.js
Cypress.Commands.add('myGlobalCommand', (param) => {
  // Global command logic
});

// Usage in tests
cy.myGlobalCommand('value');
```

---

## 📋 Best Practices Implemented

### ✅ Test Structure (Arrange-Act-Assert)

```javascript
it('Should test feature', () => {
  // Arrange: Set up test data and prerequisites
  LoginPage.visit();

  // Act: Perform actions
  LoginPage.login('user', 'pass');

  // Assert: Verify results
  InventoryPage.verifyInventoryPageIsDisplayed();
});
```

### ✅ Meaningful Test Names

- Clear, descriptive test names
- States what should happen
- Example: `Should complete purchase with valid data`

### ✅ DRY Principle (Don't Repeat Yourself)

- Reuse page object methods
- Centralize test data
- Use fixtures effectively

### ✅ Proper Waits and Assertions

```javascript
// ✅ Good: Cypress handles waiting
cy.get('[data-test="element"]').should('be.visible');

// ❌ Avoid: Arbitrary waits
cy.wait(5000);
```

### ✅ Element Selectors Priority

1. **data-test attributes** (most stable)
2. **Semantic HTML** (id, name)
3. **CSS classes** (less stable)
4. **XPath** (last resort)

---

## 🐛 Troubleshooting

### Tests not running?

1. **Verify Node.js installation**

   ```bash
   node --version
   npm --version
   ```

2. **Check dependencies installed**

   ```bash
   npm install
   ```

3. **Clear Cypress cache**
   ```bash
   npx cypress cache clear
   ```

### Selectors not finding elements?

1. Open DevTools (F12) in Cypress
2. Inspect element to verify selector
3. Update selector in corresponding Page Object
4. Verify data-test attributes exist on target elements

### Tests timing out?

1. Check network connectivity
2. Verify application is running
3. Increase timeout in `cypress.config.js` if needed:
   ```javascript
   e2e: {
     defaultCommandTimeout: 10000;
   }
   ```

---

## 📚 Resources & Documentation

- [Cypress Official Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://wiki.saucelabs.com/display/TAAS/Page+Object+Model)
- [Sauce Labs Demo App](https://www.saucedemo.com/)

---

## 📖 Additional Documentation

- **Page Objects Guide**: See [cypress/support/pages/README.md](cypress/support/pages/README.md)
- **API Tests Guide**: See [cypress/api/README.md](cypress/api/README.md)

---

## 👥 Contributing

When contributing to this framework:

1. Follow the existing code structure
2. Use Page Object Model for UI interactions
3. Add JSDoc comments to new functions
4. Update test data in fixtures.json
5. Run tests before committing
6. Update documentation as needed

---

## 📞 Support & Questions

For issues or questions:

1. Check existing documentation
2. Review similar test implementations
3. Check Cypress documentation
4. Use Cypress Test Runner for debugging

---

## 📄 License

This project is part of the Devsu QA Assessment.

---

## 🎯 Assessment Requirements

✅ **Requirement 1**: Authenticate with standard_user / secret_sauce  
✅ **Requirement 2**: Add two products to cart  
✅ **Requirement 3**: View shopping cart  
✅ **Requirement 4**: Complete checkout form  
✅ **Requirement 5**: Finalize purchase with confirmation

---

## 📊 Project Status

| Component     | Status      | Comments                             |
| ------------- | ----------- | ------------------------------------ |
| E2E Tests     | ✅ Complete | 2 test scenarios implemented         |
| Page Objects  | ✅ Complete | 5 page objects created               |
| Test Data     | ✅ Complete | JSON fixtures configured             |
| API Tests     | ⏳ Pending  | Placeholder ready for implementation |
| Documentation | ✅ Complete | Professional documentation           |

---

**Last Updated**: February 12, 2026  
**Framework Version**: 1.0.0  
**Cypress Version**: 15.10.0
