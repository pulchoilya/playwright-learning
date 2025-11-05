import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

test.describe.serial("Registration + Login + Add a car Tests", () => {
  test.beforeAll(async () => {
    userData = {
      firstName: faker.string.alpha({ length: { min: 2, max: 20 } }),
      lastName: faker.string.alpha({ length: { min: 2, max: 20 } }),
      email: `test_${Date.now()}@example.com`,
      password: faker.internet.password({
        length: 10,
        memorable: true,
        pattern: /[A-Za-z0-9]/,
        prefix: "Qw1",
      }),
    };
  });

  test("Registration", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".modal-header")).toHaveText(/Registration/i);

    const signupModal = page.locator(".modal-body");
    await signupModal.locator("#signupName").fill(userData.firstName);
    await signupModal.locator("#signupLastName").fill(userData.lastName);
    await signupModal.locator("#signupEmail").fill(userData.email);
    await signupModal.locator("#signupPassword").fill(userData.password);
    await signupModal.locator("#signupRepeatPassword").fill(userData.password);
    await page.locator('button:has-text("Register")').click();

    await expect(page).toHaveURL(/panel\/garage/);
    await expect(page.locator("#userNavDropdown")).toHaveText(/My profile/i);
  });

  test("Login with registered user", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.locator(".modal-header")).toHaveText(/Log In/i);

    const signInModal = page.locator(".modal-body");
    await signInModal.locator("#signinEmail").fill(userData.email);
    await signInModal.locator("#signinPassword").fill(userData.password);
    await page.locator('button:has-text("Login")').click();

    await expect(page).toHaveURL(/panel\/garage/);
    await expect(page.locator("#userNavDropdown")).toHaveText(/My profile/i);
  });

  test("Add car", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign in" }).click();

    const signInModal = page.locator(".modal-body");
    await signInModal.locator("#signinEmail").fill(userData.email);
    await signInModal.locator("#signinPassword").fill(userData.password);
    await page.locator('button:has-text("Login")').click();

    await expect(page).toHaveURL(/panel\/garage/);

    await page.getByRole("button", { name: "Add car" }).click();

    const addCarModal = page.locator(".modal-content");
    await expect(addCarModal.locator(".modal-header .modal-title")).toHaveText(
      "Add a car",
    );
    await addCarModal.locator("#addCarBrand").selectOption({ label: "Audi" });
    await addCarModal.locator("#addCarModel").selectOption({ label: "R8" });
    await addCarModal.locator("#addCarMileage").fill("1000");
    await addCarModal.getByRole("button", { name: "Add" }).click();

    const createdCarCard = page.locator(".panel-page_content");
    await expect(createdCarCard.locator(".car_name")).toHaveText("Audi R8");
    const milesInput = createdCarCard.locator('input[formcontrolname="miles"]');
    await expect(milesInput).toHaveValue("1000");
  });
});
