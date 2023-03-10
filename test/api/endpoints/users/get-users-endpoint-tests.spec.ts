import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";

describe("GET /users", () => {
  it("should return status code 200", async () => {
    const expectedStatusCode = 200;

    const response = await request(baseURL)
      .get("/api/users")
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(expectedStatusCode);
  });

  it("should return user with id 1", async () => {
    const expectedUser = {
      id: 1,
      email: "Moses.Armstrong@Feest.ca",
      firstname: "Moses",
      lastname: "Armstrong",
      password: "0Lelia39",
    };

    const response = await request(baseURL)
      .get(`/api/users/${expectedUser.id}`)
      .set("User-Agent", "Chrome");

    expect(response.body).to.deep.contains(expectedUser);
  });
});
