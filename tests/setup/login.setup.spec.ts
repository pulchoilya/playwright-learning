import { test as setup } from "@playwright/test";
import { LoginPage } from "../../src/pages/LogInPage";

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.openLoginForm();
  await loginPage.fillLoginForm({ email, password });
  await loginPage.submitLoginForm();
  await loginPage.verifyLoginSuccess();
  await page.getByRole("button", { name: "Add car" }).waitFor();

  await page.context().storageState({ path: "session-storage.json" });
});
