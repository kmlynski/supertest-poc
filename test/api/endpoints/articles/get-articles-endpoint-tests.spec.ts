import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";

describe("GET /articles", () => {
  it("should return status code 200", async () => {
    const expectedStatusCode = 200;

    const response = await request(baseURL)
      .get("/api/articles")
      .set("User-Agent", "Chrome");

    expect(response.statusCode).to.be.equal(expectedStatusCode);
  });
});

describe("GET /articles/1", () => {
  it("should return article with id 1", async () => {
    const expectedArticle = {
      id: 1,
      title: "The beauty of the sunset was obscured by the industrial cranes",
      user_id: 1,
      date: "2021-07-13",
    };

    const response = await request(baseURL)
      .get(`/api/articles/${expectedArticle.id}`)
      .set("User-Agent", "Chrome");

    expect(response.body).to.deep.contains(expectedArticle);
  });
});
