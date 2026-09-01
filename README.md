# Shopware 6 — Automated Guest Checkout Test

This folder contains one end-to-end automated test for the Shopware 6 guest checkout flow.

## Technology

- **Language:** JavaScript
- **Framework:** Playwright Test
- **Browser:** Chromium, installed by Playwright
- **Environment under test:** Shopware 6 public demo: `https://www.shopware6-demo.development-s25.com/`

Playwright uses automatic waiting, readable assertions, screenshots/traces on failures, and stable selectors such as element IDs and accessible roles.

## Project structure

```text
pages/
  ShopwareCheckoutPage.js   # Reusable checkout actions and assertions
tests/
  guest-checkout.spec.js    # The short, readable end-to-end test
```

The test file describes the business flow. The Page Object holds the website-specific locators and actions. This keeps the test easy to read and makes future selector changes happen in one file.

## Install once

1. Close every VS Code terminal and open a **new** VS Code terminal. This lets Windows detect your new Node.js installation.
2. Make sure the terminal is in this project folder:

   ```powershell
   cd C:\Users\ADMIN\Desktop\shopware-qa
   ```

3. Run these commands one at a time:

   ```powershell
   node --version
   npm.cmd --version
   npm.cmd install
   npx.cmd playwright install chromium
   ```

The first two commands must print version numbers. If they do not, restart VS Code or your computer and try again.

## Run the automated test

Run with a visible browser first, so you can watch every step:

```powershell
npm.cmd run test:headed
```

Or run it in the background:

```powershell
npm.cmd test
```

The test opens the website itself. You do **not** connect VS Code to Shopware and you do not paste code into the website.

The last step confirms an order in the public demo environment. Use fictional details only; the test already creates a unique fictional email for each run.

## View the report

After the test finishes, run:

```powershell
npm.cmd run test:report
```

This starts a local report at `http://localhost:9323`. It is only a Playwright test report on your laptop, not the Shopware store. Keep the terminal open while viewing it, then press `Ctrl + C` to stop it.

If it fails, Playwright saves a screenshot, video, and trace in the test-result folders. These help identify which step needs adjustment.

## If I had more time

- Verify selectors against a dedicated stable test environment and request `data-testid` attributes where possible.
- Add automated tests for invalid form input, cart quantity limits, variants, and totals.
- Run tests against a dedicated test instance so public demo orders are not created.
