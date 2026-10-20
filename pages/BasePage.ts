import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(protected readonly page: Page) {
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartCount(count: number) {
    if (count === 0) await expect(this.cartBadge).toBeHidden();
    else await expect(this.cartBadge).toHaveText(String(count));
  }
}
