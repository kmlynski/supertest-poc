import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";
import { getRandomArticle } from "../../dtos/article";

describe("PUT /articles", () => {
  it("should update valid user", async () => {
    const expectedStatusCode = 200;
    const articleId = 2;
    const payload = getRandomArticle();

    const response = await request(baseURL)
      .put(`/api/articles/${articleId}`)
      .send(payload)
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(expectedStatusCode);
    const updatedArticle = await request(baseURL)
      .get(`/api/articles/${response.body.id}`)
      .set("User-Agent", "Chrome");
    expect(updatedArticle.body).to.contains(payload);
  });
});
