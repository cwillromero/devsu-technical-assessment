/**
 * Test Suite: Purchase Flow E2E Tests
 *
 * This module contains end-to-end tests for the complete purchase flow
 * on the Sauce Labs Demo Application (saucedemo.com).
 *
 * Uses Page Object Model (POM) for maintainability and scalability.
 *
 * Requirements Covered:
 * - User authentication with standard_user credentials
 * - Adding products to shopping cart
 * - Shopping cart verification
 * - Checkout form completion
 * - Order finalization and confirmation
 */

import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  ConfirmationPage,
} from '../support/pages/index';

describe('Purchase Flow - End-to-End', () => {
  let testData;

  before(() => {
    // Load test data from fixture
    cy.fixture('test-data').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Navigate to login page before each test
    cy.visit('/');
  });

  it('Should complete a successful purchase flow with two products', () => {
    // Step 1: Authenticate with valid credentials
    LoginPage.login(
      testData.users.standard.username,
      testData.users.standard.password
    );

    // Step 2: Verify inventory page is displayed
    InventoryPage.verifyInventoryPageIsDisplayed();

    // Step 3: Add two products to the shopping cart
    InventoryPage.addProductToCart(testData.products.backpack);
    InventoryPage.addProductToCart(testData.products.bikeLight);

    // Step 4: Verify that cart contains 2 items
    InventoryPage.verifyCartBadgeCount('2');

    // Step 5: Navigate to shopping cart
    InventoryPage.goToShoppingCart();

    // Step 6: Verify cart page is displayed
    CartPage.verifyCartPageIsDisplayed();

    // Step 7: Verify both products are in the cart
    CartPage.verifyProductInCart(testData.products.backpack);
    CartPage.verifyProductInCart(testData.products.bikeLight);

    // Step 8: Proceed to checkout
    CartPage.proceedToCheckout();

    // Step 9: Verify checkout step 1 is displayed
    CheckoutPage.verifyCheckoutStepOneIsDisplayed();

    // Step 10: Fill in checkout information
    CheckoutPage.proceedToStepTwo(
      testData.customers.customer1.firstName,
      testData.customers.customer1.lastName,
      testData.customers.customer1.postalCode
    );

    // Step 11: Verify checkout step 2 is displayed
    CheckoutPage.verifyCheckoutStepTwoIsDisplayed();

    // Step 12: Verify products in order review
    CheckoutPage.verifyProductInOrderReview(testData.products.backpack);
    CheckoutPage.verifyProductInOrderReview(testData.products.bikeLight);

    // Step 13: Complete the purchase
    CheckoutPage.finishPurchase();

    // Step 14: Verify confirmation page is displayed
    ConfirmationPage.verifyConfirmationPageIsDisplayed();

    // Step 15: Verify order confirmation message
    ConfirmationPage.verifyConfirmationMessage(
      testData.messages.orderConfirmation
    );
  });

  it('Should complete purchase flow with alternative products', () => {
    // Step 1: Authenticate with valid credentials
    LoginPage.login(
      testData.users.standard.username,
      testData.users.standard.password
    );

    // Step 2: Verify inventory page is displayed
    InventoryPage.verifyInventoryPageIsDisplayed();

    // Step 3: Add two different products to cart
    InventoryPage.addProductToCart(testData.products.tShirt);
    InventoryPage.addProductToCart(testData.products.fleecejacket);

    // Step 4: Navigate to shopping cart
    InventoryPage.goToShoppingCart();

    // Step 5: Verify cart page is displayed
    CartPage.verifyCartPageIsDisplayed();

    // Step 6: Proceed to checkout
    CartPage.proceedToCheckout();

    // Step 7: Fill in checkout information with different user data
    CheckoutPage.proceedToStepTwo(
      testData.customers.customer2.firstName,
      testData.customers.customer2.lastName,
      testData.customers.customer2.postalCode
    );

    // Step 8: Complete the purchase
    CheckoutPage.finishPurchase();

    // Step 9: Verify order confirmation
    ConfirmationPage.verifyConfirmationPageIsDisplayed();
    ConfirmationPage.verifyConfirmationMessage(
      testData.messages.orderConfirmation
    );
  });
});
