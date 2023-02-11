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
  describe("empty fields", () => {
    const emptyFields = ["user_id", "title", "body", "date"];
    emptyFields.forEach((field) => {
      it(`should not create article with empty ${field} `, async () => {
        const expectedStatusCode = 422;
        const articleWithEmptyField = {
          ...getRandomArticle(),
          [field]: "",
        };

        const getResponse = await request(baseURL)
          .get("/api/articles")
          .set("User-Agent", "Chrome");

        const numberOfArticlesBefore = getResponse.body.length;
        const response = await request(baseURL)
          .post("/api/articles")
          .send(articleWithEmptyField)
          .set("User-Agent", "Chrome");

        expect(response.statusCode).to.be.equal(expectedStatusCode);

        const getResponseAfter = await request(baseURL)
          .get("/api/articles")
          .set("User-Agent", "Chrome");

        const numberOfArticlesAfter = getResponseAfter.body.length;

        expect(numberOfArticlesAfter).to.be.equal(numberOfArticlesBefore);
      });
    });
  });
});
