import { test } from "../../fixtures/userGaragePage";
import { expect } from "@playwright/test";

test("Mock profile on authenticated user", async ({ userGaragePage }) => {
  await userGaragePage.navigate();

  await userGaragePage.page.route("**/api/users/profile", async (route) => {
    const mocked = {
      status: "ok",
      data: {
        userId: 999999,
        photoFilename: "mock-photo.png",
        name: "QA",
        lastName: "AUTO",
      },
    };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mocked),
    });
  });

  await userGaragePage.page.locator('a[routerlink="profile"]').click();
  await expect(userGaragePage.page.locator("p.profile_name")).toHaveText(
    "QA AUTO",
  );
  await expect(
    userGaragePage.page.locator("img.profile_photo"),
  ).toHaveAttribute(
    "src",
    "https://qauto.forstudy.space/public/images/users/mock-photo.png",
  );
});
