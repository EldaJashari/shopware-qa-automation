const { expect } = require('@playwright/test');

class ShopwareCheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async openStorefront() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/shopware6-demo\.development-s25\.com/);
  }

  async acceptEssentialCookies() {
    const essentialCookies = this.page.getByRole('button', {
      name: /nur technisch notwendige/i
    });

    if (await essentialCookies.isVisible().catch(() => false)) {
      await essentialCookies.click();
    }
  }

  async openFirstProductFromClothing() {
    await this.page.getByRole('link', { name: 'Clothing', exact: true }).first().click();
    await expect(this.page).toHaveURL(/Clothing/i);

    // The public demo does not expose data-testid attributes for product cards.
    const firstProductCard = this.page.locator('.product-box').first();
    await expect(firstProductCard).toBeVisible();

    const productLink = firstProductCard.getByRole('link').filter({ hasText: /.+/ }).first();
    await productLink.click();
    await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible();
  }

  async addCurrentProductToCart() {
    const addToCartButton = this.page.locator('button[name="add-to-cart"], button.btn-buy').first();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    const cartNotification = this.page
      .getByRole('alert')
      .filter({ hasText: /warenkorb hinzugefügt|added to cart/i })
      .first();
    await expect(cartNotification).toBeVisible();
  }

  async openCart() {
    // The mini-cart popup is inconsistent in the public demo, so use its stable route.
    await this.page.goto('/checkout/cart');
    await expect(this.page).toHaveURL(/checkout\/cart/);
    await expect(this.page.locator('main')).toContainText(/demo produkt|warenkorb/i);
  }

  async openGuestRegistration() {
    await this.page.goto('/checkout/confirm');
    await expect(this.page).toHaveURL(/checkout\/register/);
    await expect(this.page.getByRole('heading', { name: /versandinformationen/i })).toBeVisible();
  }

  async fillGuestDetails(customer) {
    await this.page.getByRole('combobox', { name: /anrede/i }).selectOption({ label: 'Mrs.' });
    await this.page.getByRole('textbox', { name: /vorname/i }).fill(customer.firstName);
    await this.page.getByRole('textbox', { name: /nachname/i }).fill(customer.lastName);
    await this.page.getByRole('textbox', { name: /e-mail-adresse/i }).fill(customer.email);
    await this.page.getByRole('textbox', { name: /straße und hausnummer/i }).fill(customer.street);
    await this.page.getByRole('textbox', { name: 'PLZ', exact: true }).fill(customer.zip);
    await this.page.getByRole('textbox', { name: 'Ort', exact: true }).fill(customer.city);
  }

  async continueToOrderConfirmation() {
    await this.page.getByRole('button', { name: 'Weiter', exact: true }).click();
    await expect(this.page).toHaveURL(/checkout\/confirm/);
  }

  async selectCashOnDelivery() {
    const cashOnDelivery = this.page.getByText(/cash on delivery|nachnahme/i).first();
    await expect(cashOnDelivery).toBeVisible();
    await cashOnDelivery.click();
  }

  async acceptTerms() {
    const termsCheckbox = this.page.locator('#acceptTerms, input[name="tos"]').first();
    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
  }

  async confirmOrder() {
    const confirmOrderButton = this.page.locator('#confirmFormSubmit').first();
    await expect(confirmOrderButton).toBeVisible();
    await confirmOrderButton.click();
    await expect(this.page).toHaveURL(/checkout\/finish/);
    await expect(this.page.getByText(/order number|bestellnummer|thank you/i).first()).toBeVisible();
  }
}

module.exports = { ShopwareCheckoutPage };
