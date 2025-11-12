import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddCar extends BasePage {
  readonly _addCarButton: Locator;
  readonly _addCarModal: Locator;
  readonly _addCarBrand: Locator;
  readonly _addCarModel: Locator;
  readonly _addCarMileage: Locator;
  readonly _addBtn: Locator;

  constructor(page: Page) {
    super(page, "/");

    this._addCarButton = page.getByRole("button", { name: "Add car" });
    this._addCarModal = page.locator(".modal-content");
    this._addCarBrand = this._addCarModal.locator("#addCarBrand");
    this._addCarModel = this._addCarModal.locator("#addCarModel");
    this._addCarMileage = this._addCarModal.locator("#addCarMileage");
    this._addBtn = this._addCarModal.getByRole("button", { name: "Add" });
  }

  async addCar(brand: string, model: string, mileage: string) {
    await this._addCarButton.click();
    await expect(this._addCarModal.locator("h4")).toHaveText("Add a car");

    await this._addCarBrand.selectOption(brand);
    await this._addCarModel.selectOption(model);
    await this._addCarMileage.fill(mileage);
    await this._addBtn.click();
  }

  async verifyCarExists(brand: string, model: string, mileage: string) {
    const carCard = this._page
      .locator(".panel-page_content")
      .filter({ hasText: `${brand} ${model}` });
    await expect(carCard.locator(".car_name")).toHaveText(`${brand} ${model}`);
    await expect(carCard.locator('input[formcontrolname="miles"]')).toHaveValue(
      mileage,
    );
  }
}
