import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addItems(count: number): Promise<string[]> {
    const names = (await this.itemNames.allTextContents()).slice(0, count);
    if (names.length < count) throw new Error(`Only ${names.length} products available, needed ${count}`);
    for (let i = 0; i < count; i++) {
      await this.items.nth(i).getByRole('button', { name: 'Add to cart' }).click();
    }
    return names;
  }

  async sortBy(label: string) {
    await this.sortDropdown.selectOption({ label });
  }

  async getNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }
}
