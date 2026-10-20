import { test } from '../fixtures/fixtures';

test('removing an item keeps the others and updates the cart count', async ({ inventoryPage, cartPage }) => {
  const added = await inventoryPage.addItems(3);
  await inventoryPage.expectCartCount(3);

  await inventoryPage.openCart();
  await cartPage.expectItems(added);

  const [removed, ...remaining] = added;
  await cartPage.removeItem(removed);

  await cartPage.expectItems(remaining);
  await cartPage.expectCartCount(remaining.length);
});
