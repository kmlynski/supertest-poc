import { faker } from "@faker-js/faker";

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  avatar: string;
}

export const getRandomUser = (): User => {
  return {
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    avatar: "\\data\\users\\face_1591133479.7144732.jpg",
  };
};
