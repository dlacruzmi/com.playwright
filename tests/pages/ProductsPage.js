export class ProductsPage {

  constructor(page) {
    this.page = page;
    this.title = ".title";
    this.inventoryItem = ".inventory_item";
    this.cartLink = ".shopping_cart_link";
    this.cartBadge = ".shopping_cart_badge";
  }

  async isLoaded() {
    return this.page.locator(this.title).isVisible();
  }

  async addFirstProductToCart() {
    const firstItem = this.page.locator(this.inventoryItem).first();
    const addButton = firstItem.locator("button:has-text('Add to cart')");
    await addButton.click();
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }

  async getCartBadgeCount() {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return text.trim();
    }
    return "0";
  }
}
