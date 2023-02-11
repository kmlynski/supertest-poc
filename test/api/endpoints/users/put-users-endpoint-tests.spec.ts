import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";
import { getRandomUser } from "../../dtos/user";

describe("PUT /users", () => {
  it.only("should update valid user", async () => {
    const expectedStatusCode = 200;
    const userId = 2;
    const payload = getRandomUser();

    const response = await request(baseURL)
      .put(`/api/users/${userId}`)
      .send(payload)
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(expectedStatusCode);
    const updatedUser = await request(baseURL)
      .get(`/api/users/${response.body.id}`)
      .set("User-Agent", "Chrome");
    expect(updatedUser.body).to.contains(payload);
  });
});
