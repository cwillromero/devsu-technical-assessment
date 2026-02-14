/**
 * Shopping Cart Page Object Model
 *
 * This class represents the shopping cart page and encapsulates selectors
 * and actions related to managing items in the cart.
 */

class CartPage {
  // Page Selectors
  cartItem = '[data-test="inventory-item"]';
  checkoutButton = '[data-test="checkout"]';

  /**
   * Verifies that the cart page is displayed
   */
  verifyCartPageIsDisplayed() {
    cy.url().should('include', '/cart');
  }

  /**
   * Verifies that a product is in the cart
   *
   * @param {string} productName - The product name to verify
   */
  verifyProductInCart(productName) {
    cy.get(this.cartItem).should('contain', productName);
  }

  /**
   * Proceeds to checkout
   */
  proceedToCheckout() {
    cy.get(this.checkoutButton).click();
  }

}

export default new CartPage();
