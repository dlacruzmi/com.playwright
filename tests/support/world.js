import { setWorldConstructor } from "@cucumber/cucumber";
import { chromium } from "playwright";

class CustomWorld {
  constructor({ attach } = {}) {
    this.attach = attach;

    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    }
  }

  async closeBrowser() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
