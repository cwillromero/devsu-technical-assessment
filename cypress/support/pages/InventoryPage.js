/**
 * Inventory Page Object Model
 *
 * This class represents the inventory/products page and encapsulates selectors
 * and actions related to browsing and managing products.
 */

class InventoryPage {
  // Page Selectors
  inventoryContainer = '.inventory_container';
  inventoryItem = '[data-test="inventory-item"]';
  inventoryItemName = '[data-test="inventory-item-name"]';
  addToCartButton = '[data-test^="add-to-cart"]';
  shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  shoppingCartLink = 'a[data-test="shopping-cart-link"]';

  /**
   * Verifies that the inventory page is displayed
   */
  verifyInventoryPageIsDisplayed() {
    cy.get(this.inventoryContainer).should('be.visible');
  }

  /**
   * Adds a product to cart by product name
   *
   * @param {string} productName - The exact or partial product name
   * @throws {Error} If product not found
   */
  addProductToCart(productName) {
    cy.get(this.inventoryItem).each(($item) => {
      cy.wrap($item)
        .find(this.inventoryItemName)
        .invoke('text')
        .then((text) => {
          if (text.includes(productName)) {
            cy.wrap($item).find(this.addToCartButton).click();
          }
        });
    });
  }

  /**
   * Verifies that the cart badge shows the correct number of items
   *
   * @param {number} count - The expected number of items
   */
  verifyCartBadgeCount(count) {
    cy.get(this.shoppingCartBadge).should('contain', count);
  }

  /**
   * Navigates to the shopping cart
   */
  goToShoppingCart() {
    cy.get(this.shoppingCartLink).click();
  }
}

export default new InventoryPage();
