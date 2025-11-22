import { test, expect, Locator } from "@playwright/test";

test.describe("Registration Form Tests", () => {
  let signupModal: Locator;
  let nameInput: Locator;
  let lastNameInput: Locator;
  let emailInput: Locator;
  let passwordInput: Locator;
  let repeatPasswordInput: Locator;
  let email: string;

  const firstName = "Ilya";
  const lastName = "Tester";
  const password = "Qw1Test123";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // await expect(page).toHaveURL(/qauto\.forstudy\.space/);

    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".modal-header")).toHaveText(/Registration/i);

    signupModal = page.locator(".modal-body app-signup-form");

    nameInput = signupModal.locator("#signupName");
    lastNameInput = signupModal.locator("#signupLastName");
    emailInput = signupModal.locator("#signupEmail");
    passwordInput = signupModal.locator("#signupPassword");
    repeatPasswordInput = signupModal.locator("#signupRepeatPassword");

    email = `test_${Date.now()}@example.com`;
  });

  test("Registration user", async ({ page }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await page.locator('button:has-text("Register")').click();

    // await expect(page).toHaveURL(/.*\/panel\/garage$/);
    await expect(page.locator("#userNavDropdown")).toHaveText(/My profile/i);
  });

  // === Name field tests ===
  test("Validation: empty 'Name' field shows 'Name required'", async ({
    page,
  }) => {
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await nameInput.focus();
    await nameInput.blur();

    const nameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(nameError).toHaveText(/Name required/i);

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: invalid 'Name' value shows 'Name is invalid'", async ({
    page,
  }) => {
    await nameInput.fill("Ilya2222");
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await nameInput.focus();
    await nameInput.blur();

    const nameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(nameError).toHaveText(/Name is invalid/i);
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: invalid 'Name' value shows 'Name has to be from 2 to 20 characters long'", async ({
    page,
  }) => {
    await nameInput.fill("I");
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await nameInput.focus();
    await nameInput.blur();

    const nameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(nameError).toHaveText(
      /Name has to be from 2 to 20 characters long/i,
    );
    await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  // === Last Name field tests ===
  test("Validation: empty 'Last Name' field shows 'Last name required'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await lastNameInput.focus();
    await lastNameInput.blur();

    const nameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );

    await expect(nameError).toHaveText(/Last name required/i);
    const registerButton = page.locator('button:has-text("Register")');

    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: invalid 'Last Name' value shows 'Last name is invalid'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill("Tester!2");
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await nameInput.focus();
    await nameInput.blur();

    const lastNameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(lastNameError).toHaveText(/Last name is invalid/i);
    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: invalid 'Last Name' value shows 'Last name has to be from 2 to 20 characters long'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill("T");
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await nameInput.focus();
    await nameInput.blur();

    const lastNameError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(lastNameError).toHaveText(
      /Last name has to be from 2 to 20 characters long/i,
    );
    await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  // === Email field tests ===
  test("Validation: invalid 'Email' value shows 'Email is incorrect'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill("test@com");
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await emailInput.focus();
    await emailInput.blur();

    const emailError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(emailError).toHaveText(/Email is incorrect/i);

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: empty 'Email' field shows 'Email required'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill(password);

    await emailInput.focus();
    await emailInput.blur();

    const emailError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(emailError).toHaveText(/Email required/i);
    await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  // === Password field tests ===
  test("Validation: invalid 'Password' value shows Wrong data - 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill("Qw1Test");
    await repeatPasswordInput.fill(password);

    const passwordError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(passwordError).toHaveText(
      /Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i,
    );

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: empty 'Password' field shows 'Password required'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await repeatPasswordInput.fill(password);

    await passwordInput.focus();
    await passwordInput.blur();

    const passwordError = signupModal.locator(
      "#signupPassword + .invalid-feedback p",
    );
    await expect(passwordError).toHaveText(/Password required/i);
    await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  // === Re-enter password field tests ===
  test("Validation: invalid 'Re-enter password' value shows 'Passwords do not match.'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill("Qw1Test123123");

    await repeatPasswordInput.focus();
    await repeatPasswordInput.blur();

    const repeatPasswordError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(repeatPasswordError).toHaveText(/Passwords do not match/i);

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: empty 'Re-enter password' field shows 'Re-enter password required'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);

    await repeatPasswordInput.focus();
    await repeatPasswordInput.blur();

    const repeatPasswordError = signupModal.locator(
      "#signupRepeatPassword + .invalid-feedback p",
    );
    await expect(repeatPasswordError).toHaveText(/Re-enter password required/i);
    await expect(repeatPasswordInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });

  test("Validation: invalid 'Re-enter password' value shows Wrong data - 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'", async ({
    page,
  }) => {
    await nameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await repeatPasswordInput.fill("Qw1Test");

    await repeatPasswordInput.focus();
    await repeatPasswordInput.blur();

    const repeatPasswordError = signupModal.locator(
      ".form-group >> .invalid-feedback >> p",
    );
    await expect(repeatPasswordError).toHaveText(
      /Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i,
    );

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toHaveAttribute("disabled", "");
  });
});
