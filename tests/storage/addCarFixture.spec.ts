import { test } from "../../fixtures/userGaragePage";
import { expect } from "@playwright/test";

test("User can Add a car using fixture", async ({ userGaragePage }) => {
  await userGaragePage.navigate();
  await expect(userGaragePage._addCarButton).toBeVisible();

  await userGaragePage.addCar("Audi", "TT", "1000");
  // await userGaragePage.verifyCarExists("Audi", "TT", "1000");
});
