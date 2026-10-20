# SauceDemo – Playwright + TypeScript

```bash
npm install
npx playwright install chromium
cp .env.example .env          # Windows: copy .env.example .env
npm test                      # headless
npm run test:headed           # watch it run
npm run report                # HTML report
```

Record video of every test: `VIDEO=1 npm test` (PowerShell: `$env:VIDEO=1; npm test`).
Videos/traces are written to `test-results/`.

## Structure

```
fixtures.ts        logs in as standard_user before each test, hands tests their page objects
pages/             Page Objects: locators + actions + assertions
tests/             3 specs, readable flows with no locators
```

## Decisions

- **Login in one place:** the `inventoryPage` fixture logs in before every test. Each test runs in its
  own fresh browser context, so no cart/session state can leak between tests.
- **Credentials** come from `.env` (git-ignored); `.env.example` is committed.
- **No hard-coded products:** tests 1/2 add "the first N products shown"; test 3 reads whatever is displayed.
- **Sorting:** read the displayed names/prices, compare with a sorted copy of the same list.
