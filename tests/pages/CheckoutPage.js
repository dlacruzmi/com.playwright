export class CheckoutPage {

  constructor(page) {
    this.page = page;

    this.cartItemName = ".cart_item .inventory_item_name";
    this.checkoutButton = "#checkout";

    this.firstNameInput = "#first-name";
    this.lastNameInput = "#last-name";
    this.postalCodeInput = "#postal-code";
    this.continueButton = "#continue";

    this.finishButton = "#finish";
    this.completeHeader = ".complete-header";
  }

  async getCartItemNames() {
    return this.page.locator(this.cartItemName).allTextContents();
  }

  async startCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  async isOrderComplete() {
    return this.page.locator(this.completeHeader).isVisible();
  }
}
