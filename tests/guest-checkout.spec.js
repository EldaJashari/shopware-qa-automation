const { test } = require('@playwright/test');
const { ShopwareCheckoutPage } = require('../pages/ShopwareCheckoutPage');

function createGuestCustomer() {
  const uniqueId = Date.now();

  return {
    firstName: 'QA',
    lastName: `Candidate${uniqueId}`,
    email: `qa.candidate.${uniqueId}@example.test`,
    street: 'Automation Street 42',
    zip: '10115',
    city: 'Berlin'
  };
}

test('guest can buy a product using Cash on Delivery', async ({ page }) => {
  const checkout = new ShopwareCheckoutPage(page);
  const customer = createGuestCustomer();

  await checkout.openStorefront();
  await checkout.acceptEssentialCookies();
  await checkout.openFirstProductFromClothing();
  await checkout.addCurrentProductToCart();
  await checkout.openCart();
  await checkout.openGuestRegistration();
  await checkout.fillGuestDetails(customer);
  await checkout.continueToOrderConfirmation();
  await checkout.selectCashOnDelivery();
  await checkout.acceptTerms();
  await checkout.confirmOrder();
});
