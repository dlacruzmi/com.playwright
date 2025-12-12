import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test"; 
import { LoginPage } from "../pages/LoginPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

Given("que estoy en la página de login de Sauce Demo", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When("inicio sesión como {string} con la contraseña {string}", async function (username, password) {
    this.loginPage = this.loginPage || new LoginPage(this.page);
    await this.loginPage.login(username, password);
});

Then("debería ver la página de productos", async function () {
  this.productsPage = new ProductsPage(this.page);
  const loaded = await this.productsPage.isLoaded();
  expect(loaded).toBeTruthy();
});

Then("debería ver un mensaje de error en el login", async function () {
  this.loginPage = this.loginPage || new LoginPage(this.page);
  const errorText = await this.loginPage.getErrorMessage();
  expect(errorText).toBeTruthy();
});

When("agrego el primer producto al carrito", async function () {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.addFirstProductToCart();
});

When("voy al carrito", async function () {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.goToCart();
  this.checkoutPage = new CheckoutPage(this.page);
});

Then("debería ver al menos un producto en el carrito", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  const items = await this.checkoutPage.getCartItemNames();
  expect(items.length).toBeGreaterThan(0);
});

When("comienzo el checkout", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.startCheckout();
});

When("completo el formulario de checkout con {string} {string} {string}",
  async function (firstName, lastName, postalCode) {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    await this.checkoutPage.fillCheckoutInformation(
      firstName,
      lastName,
      postalCode
    );
});

When("finalizo la compra", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.finishCheckout();
});

Then("debería ver la confirmación de la orden", async function () {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  const completed = await this.checkoutPage.isOrderComplete();
  expect(completed).toBeTruthy();
});

Then("el icono del carrito debería mostrar {string}", async function (expectedCount) {
    this.productsPage = this.productsPage || new ProductsPage(this.page);
    const count = await this.productsPage.getCartBadgeCount();
    expect(count).toBe(expectedCount);
});

Then("debería ver los productos agregados en el carrito de compras", async function () {
    this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
    const items = await this.checkoutPage.getCartItemNames();
    expect(items.length).toBeGreaterThan(0);
});

Then("debería ver el resultado de login {string}", async function (resultado) {
    this.loginPage = this.loginPage || new LoginPage(this.page);
    const productsPage = new ProductsPage(this.page);

    switch (resultado) {
      case "exito": {
        const loaded = await productsPage.isLoaded();
        expect(loaded).toBeTruthy();
        break;
      }

      case "error": {
        const errorText = await this.loginPage.getErrorMessage();
        expect(errorText).toBeTruthy();
        expect(errorText.toLowerCase()).not.toContain("locked out");
        break;
      }

      case "bloqueado": {
        const errorText = await this.loginPage.getErrorMessage();
        expect(errorText).toBeTruthy();
        expect(errorText.toLowerCase()).toContain("locked out");
        break;
      }

      default:
        throw new Error(
          `Resultado de login no soportado: ${resultado} (usa "exito", "error" o "bloqueado")`
        );
    }
  }
);
