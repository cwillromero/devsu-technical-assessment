/**
 * Login Page Object Model
 *
 * This class represents the login page and encapsulates selectors and actions
 * related to user authentication on the Sauce Labs Demo Application.
 */

class LoginPage {
  // Page Selectors
  usernameInput = 'input[data-test="username"]';
  passwordInput = 'input[data-test="password"]';
  loginButton = 'input[data-test="login-button"]';

  /**
   * Enters username in the username field
   *
   * @param {string} username - The username to enter
   */
  enterUsername(username) {
    cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Enters password in the password field
   *
   * @param {string} password - The password to enter
   */
  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Clicks the login button
   */
  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  /**
   * Performs complete login action
   *
   * @param {string} username - The username
   * @param {string} password - The password
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }
}

export default new LoginPage();
