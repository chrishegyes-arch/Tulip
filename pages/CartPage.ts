import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async removeItem(name: string) {
    await this.items
      .filter({ has: this.page.getByText(name, { exact: true }) })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async expectItems(names: string[]) {
    await expect
      .poll(async () => (await this.itemNames.allTextContents()).sort())
      .toEqual([...names].sort());
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
