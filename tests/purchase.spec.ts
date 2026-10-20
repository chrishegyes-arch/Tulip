import { test } from '../fixtures/fixtures';

test('user can add items to the cart and purchase them', async ({ inventoryPage, cartPage, checkoutPage }) => {
  const items = await inventoryPage.addItems(3);
  await inventoryPage.expectCartCount(3);

  await inventoryPage.openCart();
  await cartPage.expectItems(items);

  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation('Test', 'User', '12345');
  await checkoutPage.expectOverview(items);

  await checkoutPage.finish();
  await checkoutPage.expectOrderConfirmed();
  await checkoutPage.expectCartCount(0);
});
