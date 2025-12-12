import { Before, After, AfterStep } from "@cucumber/cucumber";

Before(async function () {
  await this.openBrowser();
});

AfterStep(async function () {
  if (!this.page || !this.attach) return;

  const screenshot = await this.page.screenshot({
    encoding: "base64",
    fullPage: true,
  });

  await this.attach(screenshot, "image/png");
});

After(async function () {
  await this.closeBrowser();
});
