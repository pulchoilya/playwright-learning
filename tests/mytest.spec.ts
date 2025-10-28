import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  // "page" — це фікстура
  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google");
});
