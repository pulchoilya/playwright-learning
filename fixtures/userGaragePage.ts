import { test as baseTest } from "@playwright/test";
import { AddCar } from "../src/pages/AddCar";

export const test = baseTest.extend<{
  userGaragePage: AddCar;
}>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "session-storage.json",
    });
    const page = await context.newPage();
    const garagePage = new AddCar(page);
    await use(garagePage);
  },
});
