import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Copy .env.example to .env first.`);
  return value;
}

type Pages = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(requireEnv('SAUCE_USERNAME'), requireEnv('SAUCE_PASSWORD'));

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';
