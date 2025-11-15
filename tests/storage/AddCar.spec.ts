import { test } from "@playwright/test";
import { AddCar } from "../../src/pages/AddCar";

test("User can Add a car", async ({ page }) => {
  const addCar = new AddCar(page);
  await addCar.navigate();

  await addCar._addCarButton.click();
  await addCar._addCarBrand.selectOption("Audi");
  await addCar._addCarModel.selectOption("TT");
  await addCar._addCarMileage.fill("1000");
  await addCar._addBtn.click();
  // await addCar.verifyCarExists("Audi", "TT", "1000");
});
