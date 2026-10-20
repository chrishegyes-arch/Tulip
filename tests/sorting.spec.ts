import { expect, test } from '../fixtures/fixtures';

const sortCases = [
  { label: 'Name (A to Z)', field: 'name', direction: 'asc' },
  { label: 'Name (Z to A)', field: 'name', direction: 'desc' },
  { label: 'Price (low to high)', field: 'price', direction: 'asc' },
  { label: 'Price (high to low)', field: 'price', direction: 'desc' },
] as const;

function sortedCopy(values: (string | number)[], direction: 'asc' | 'desc') {
  const copy = [...values].sort((a, b) =>
    typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b)),
  );
  return direction === 'asc' ? copy : copy.reverse();
}

for (const { label, field, direction } of sortCases) {
  test(`sorts by ${label}`, async ({ inventoryPage }) => {
    const other = sortCases.find((c) => c.label !== label)!;
    await inventoryPage.sortBy(other.label);
    await inventoryPage.sortBy(label);

    const actual = field === 'name' ? await inventoryPage.getNames() : await inventoryPage.getPrices();

    expect(actual.length).toBeGreaterThan(1);
    expect(actual).toEqual(sortedCopy(actual, direction));
  });
}
