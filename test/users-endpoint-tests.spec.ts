import * as request from "supertest";
import { expect } from "chai";

const baseUrl = "https://glaze-dandelion-shamrock.glitch.me";

describe("GET /users", () => {
  it("should return status code 200", async () => {
    const expectedStatusCode = 200;

    const response = await request(baseUrl)
      .get("/api/users")
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(expectedStatusCode);
  });
});
