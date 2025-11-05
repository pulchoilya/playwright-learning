import { faker } from "@faker-js/faker";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function generateUserData(): UserData {
  return {
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
}
