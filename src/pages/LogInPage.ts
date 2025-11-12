import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly signInButton: Locator;
  readonly modalHeader: Locator;
  readonly signInModal: Locator;
  readonly signInEmail: Locator;
  readonly signInPassword: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page, "/");

    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.modalHeader = page.locator(".modal-header");
    this.signInModal = page.locator(".modal-body app-signin-form");
    this.signInEmail = this.signInModal.locator("#signinEmail");
    this.signInPassword = this.signInModal.locator("#signinPassword");
    this.loginBtn = page.locator('button:has-text("Login")');
  }

  async openLoginForm() {
    await this.signInButton.click();
    await expect(this.modalHeader).toHaveText(/Log In/i);
  }

  async fillLoginForm(userData: { email: string; password: string }) {
    await this.signInEmail.fill(userData.email);
    await this.signInPassword.fill(userData.password);
  }

  async submitLoginForm() {
    await this.loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this._page).toHaveURL(/panel\/garage/);
    await expect(this._page.locator("#userNavDropdown")).toHaveText(
      /My profile/i,
    );
  }
}
