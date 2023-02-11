import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";
import { getRandomArticle } from "../../dtos/article";

describe("POST /articles", () => {
  it("should return status code 201", async () => {
    const expectedStatusCode = 201;
    const createdArticle = getRandomArticle();

    const response = await request(baseURL)
      .post("/api/articles")
      .send(createdArticle)
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(
      expectedStatusCode,
      `Assertion failed on: ${JSON.stringify(response.body)}`
    );

    const responseWithArticle = await request(baseURL)
      .get(`/api/articles/${response.body.id}`)
      .set("User-Agent", "Chrome");

    expect(responseWithArticle.statusCode).to.be.equal(200);
    expect(responseWithArticle.body).to.contains(createdArticle);
  });
});
