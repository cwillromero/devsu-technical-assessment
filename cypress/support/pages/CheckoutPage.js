/**
 * Checkout Page Object Model
 *
 * This class represents the checkout pages (Step 1 & Step 2) and encapsulates
 * selectors and actions related to the checkout process.
 */

class CheckoutPage {
  // Step 1 - Shipping Information Selectors
  firstNameInput = 'input[data-test="firstName"]';
  lastNameInput = 'input[data-test="lastName"]';
  postalCodeInput = 'input[data-test="postalCode"]';
  continueButton = 'input[data-test="continue"]';

  // Step 2 - Order Review Selectors
  cartItem = '[data-test="inventory-item"]';
  finishButton = '[data-test="finish"]';

  /**
   * Verifies that checkout step 1 is displayed
   */
  verifyCheckoutStepOneIsDisplayed() {
    cy.url().should('include', '/checkout-step-one');
  }

  /**
   * Verifies that checkout step 2 is displayed
   */
  verifyCheckoutStepTwoIsDisplayed() {
    cy.url().should('include', '/checkout-step-two');
  }

  /**
   * Enters first name
   *
   * @param {string} firstName - The first name to enter
   */
  enterFirstName(firstName) {
    cy.get(this.firstNameInput).clear().type(firstName);
  }

  /**
   * Enters last name
   *
   * @param {string} lastName - The last name to enter
   */
  enterLastName(lastName) {
    cy.get(this.lastNameInput).clear().type(lastName);
  }

  /**
   * Enters postal code
   *
   * @param {string} postalCode - The postal code to enter
   */
  enterPostalCode(postalCode) {
    cy.get(this.postalCodeInput).clear().type(postalCode);
  }

  /**
   * Fills in all checkout information
   *
   * @param {string} firstName - The first name
   * @param {string} lastName - The last name
   * @param {string} postalCode - The postal code
   */
  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterPostalCode(postalCode);
  }

  /**
   * Clicks the continue button (Step 1 -> Step 2)
   */
  clickContinueButton() {
    cy.get(this.continueButton).click();
  }

  /**
   * Proceeds to step 2 after filling info
   *
   * @param {string} firstName - The first name
   * @param {string} lastName - The last name
   * @param {string} postalCode - The postal code
   */
  proceedToStepTwo(firstName, lastName, postalCode) {
    this.fillCheckoutInfo(firstName, lastName, postalCode);
    this.clickContinueButton();
  }

  /**
   * Verifies cart items in checkout summary
   *
   * @param {string} productName - The product name to verify
   */
  verifyProductInOrderReview(productName) {
    cy.get(this.cartItem).should('contain', productName);
  }

  /**
   * Completes the purchase by clicking finish button
   */
  finishPurchase() {
    cy.get(this.finishButton).click();
  }
}

export default new CheckoutPage();
