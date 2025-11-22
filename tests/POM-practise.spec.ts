// import { test, expect } from "@playwright/test";
// import { RegistrationPage } from "../src/pages/RegistrationPage";
// import { LoginPage } from "../src/pages/LogInPage";
// import { AddCar } from "../src/pages/AddCar";
// import { generateUserData, UserData } from "../src/pages/testData";

// let userData: UserData;

// test.describe.serial("Registration + Login + Add a Car", () => {
//   test("User can register successfully", async ({ page }) => {
//     const registrationPage = new RegistrationPage(page);

//     userData = generateUserData();

//     await registrationPage.navigate();
//     await registrationPage.openRegistrationForm();
//     await registrationPage.fillRegistrationForm(userData);
//     await registrationPage.submitForm();
//     await registrationPage.verifyRegistrationSuccess();
//     await expect(page).toHaveURL(/panel\/garage/);
//   });

//   test("User can login with registered credentials and Add a car", async ({
//     page,
//   }) => {
//     const loginPage = new LoginPage(page);
//     const addCar = new AddCar(page);

//     await loginPage.navigate();
//     await loginPage.openLoginForm();
//     await loginPage.fillLoginForm(userData);
//     await loginPage.submitLoginForm();
//     await loginPage.verifyLoginSuccess();
//     await expect(page).toHaveURL(/panel\/garage/);

//     await addCar._addCarButton.click();
//     await addCar._addCarBrand.selectOption("Audi");
//     await addCar._addCarModel.selectOption("R8");
//     await addCar._addCarMileage.fill("1000");
//     await addCar._addBtn.click();

//     // await addCar.addCar("Audi", "R8", "1000"); // Also worked
//     await addCar.verifyCarExists("Audi", "R8", "1000");
//   });
// });
