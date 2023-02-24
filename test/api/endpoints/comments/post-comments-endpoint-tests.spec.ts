import * as request from "supertest";
import { expect } from "chai";
import { baseURL } from "../../baseURL";
import { getRandomComment } from "../../dtos/comment";

describe("POST /comments", () => {
  it.only(`should not create comment without authorization`, async () => {
    const expectedStatusCode = 403;
    const commentData = {
      ...getRandomComment(),
    };
    const headers = {
      Authorization: "Basic 123",
      "User-Agent": "Chrome",
    };

    const commentsBefore = await request(baseURL).get("/api/comments");
    const numberOfCommentsBefore = commentsBefore.body.length;

    const response = await request(baseURL)
      .post("/api/comments")
      .set(headers)
      .send(commentData);

    expect(response.statusCode).to.be.equal(expectedStatusCode);

    const commentsAfter = await request(baseURL).get("/api/comments");
    const numberOfCommentsAfter = commentsAfter.body.length;

    expect(numberOfCommentsAfter).to.be.equal(
      numberOfCommentsBefore,
      "Number of comments should not change"
    );
  });
});
