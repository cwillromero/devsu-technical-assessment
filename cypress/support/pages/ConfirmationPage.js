/**
 * Order Confirmation Page Object Model
 *
 * This class represents the order confirmation page and encapsulates selectors
 * and actions related to verifying successful order completion.
 */

class ConfirmationPage {
  // Page Selectors
  confirmationContainer = '.checkout_complete_container';
  completeHeader = '[data-test="complete-header"]';

  /**
   * Verifies that the order confirmation page is displayed
   */
  verifyConfirmationPageIsDisplayed() {
    cy.url().should('include', '/checkout-complete');
    cy.get(this.confirmationContainer).should('be.visible');
  }

  /**
   * Verifies the order confirmation message
   */
  verifyConfirmationMessage(message) {
    cy.get(this.completeHeader)
      .should('be.visible')
      .and('contain', message);
  }
}

export default new ConfirmationPage();
