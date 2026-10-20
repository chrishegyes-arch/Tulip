import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const toNumber = (text: string) => Number(text.match(/\d+(\.\d+)?/)![0]);

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async expectOverview(names: string[]) {
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect
      .poll(async () => (await this.itemNames.allTextContents()).sort())
      .toEqual([...names].sort());

    const prices = (await this.itemPrices.allTextContents()).map(toNumber);
    const subtotal = toNumber(await this.subtotalLabel.innerText());
    const tax = toNumber(await this.taxLabel.innerText());
    const total = toNumber(await this.totalLabel.innerText());
    expect(subtotal).toBeCloseTo(prices.reduce((a, b) => a + b, 0), 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
