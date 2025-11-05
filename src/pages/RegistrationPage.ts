import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  readonly signUpButton: Locator;
  readonly modalHeader: Locator;
  readonly signupModal: Locator;
  readonly signupName: Locator;
  readonly signupLastName: Locator;
  readonly signupEmail: Locator;
  readonly signupPassword: Locator;
  readonly signupRepeatPassword: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    super(page, "/");

    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.modalHeader = page.locator(".modal-header");
    this.signupModal = page.locator(".modal-body app-signup-form");
    this.signupName = this.signupModal.locator("#signupName");
    this.signupLastName = this.signupModal.locator("#signupLastName");
    this.signupEmail = this.signupModal.locator("#signupEmail");
    this.signupPassword = this.signupModal.locator("#signupPassword");
    this.signupRepeatPassword = this.signupModal.locator(
      "#signupRepeatPassword",
    );
    this.registerBtn = page.locator('button:has-text("Register")');
  }

  async openRegistrationForm() {
    await this.signUpButton.click();
    await expect(this.modalHeader).toHaveText(/Registration/i);
  }

  async fillRegistrationForm(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.signupName.fill(userData.firstName);
    await this.signupLastName.fill(userData.lastName);
    await this.signupEmail.fill(userData.email);
    await this.signupPassword.fill(userData.password);
    await this.signupRepeatPassword.fill(userData.password);
  }

  async submitForm() {
    await this.registerBtn.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this._page).toHaveURL(/panel\/garage/);
    await expect(this._page.locator("#userNavDropdown")).toHaveText(
      /My profile/i,
    );
  }
}
