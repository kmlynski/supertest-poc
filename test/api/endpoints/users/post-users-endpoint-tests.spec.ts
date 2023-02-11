import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";
import { getRandomUser } from "../../dtos/user";

describe("POST /users", () => {
  it("should return status code 201", async () => {
    const expectedStatusCode = 201;
    const createdUser = getRandomUser();

    const response = await request(baseURL)
      .post("/api/users")
      .send(createdUser)
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(
      expectedStatusCode,
      `Assertion failed on: ${JSON.stringify(response.body)}`
    );

    const responseWithUser = await request(baseURL)
      .get(`/api/users/${response.body.id}`)
      .set("User-Agent", "Chrome");

    expect(responseWithUser.statusCode).to.be.equal(200);
    expect(responseWithUser.body).to.contains(createdUser);
  });

  describe("empty fields", () => {
    const emptyFields = ["email", "firstname", "lastname", "avatar"];
    emptyFields.forEach((field) => {
      it(`should not create user with empty ${field}`, async () => {
        const expectedStatusCode = 422;
        const userWithEmptyField = {
          ...getRandomUser(),
          [field]: "",
        };

        const getResponse = await request(baseURL)
          .get("/api/users")
          .set("User-Agent", "Chrome");

        const numberOfUsersBefore = getResponse.body.length;

        const response = await request(baseURL)
          .post("/api/users")
          .send(userWithEmptyField)
          .set("User-Agent", "Chrome");

        expect(response.statusCode).to.be.equal(expectedStatusCode);

        const getResponseAfter = await request(baseURL)
          .get("/api/users")
          .set("User-Agent", "Chrome");

        const numberOfUsersAfter = getResponseAfter.body.length;

        expect(numberOfUsersAfter).to.be.equal(numberOfUsersBefore);
      });
    });
  });
});
