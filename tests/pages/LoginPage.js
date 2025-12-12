const BASE_URL = "https://www.saucedemo.com/";

export class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = "#user-name";
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = "[data-test='error']";
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    if (await this.page.locator(this.errorMessage).isVisible()) {
      return await this.page.textContent(this.errorMessage);
    }
    return "";
  }
}
