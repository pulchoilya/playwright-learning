import { test, expect } from "@playwright/test";

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test.describe("/api/cars POST tests via fixture request", () => {
  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post("/api/auth/signin", {
      data: { email, password, remember: false },
    });
    expect(loginResponse.ok()).toBeTruthy();
  });

  test("should create a car successfully", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: { carBrandId: 1, carModelId: 1, mileage: 122 },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.data.brand).toBe("Audi");
    expect(body.data.model).toBe("TT");
  });

  test("should return 400 Bad request for completely invalid data", async ({
    request,
  }) => {
    const response = await request.post("/api/cars", {
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe("Car brand id is required");
  });

  test("should return 404 Not found for non-existent car", async ({
    request,
  }) => {
    const nonExistentId = 999;
    const response = await request.get(`/api/cars/${nonExistentId}`);

    expect(response.status()).toBe(404);
    const body = await response.json();

    expect(body.status).toBe("error");
    expect(body.message).toBe("Car not found");
  });
});

// test("Cars models public request", async ({ request }) => {
//   const response = await request.get("/api/cars/models");
//   const body = await response.json();
//   console.log(response);
//   console.log("_____");
//   console.log(body);
// });

// test("/cars_private_request", async ({ request }) => {
//   const authRequest = await request.post("/api/auth/signin", {
//     data: {
//       email: email,
//       password: password,
//       remember: false,
//     },
//   });
//   console.log(await authRequest.json());
// });
