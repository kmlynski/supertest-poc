import { expect, test } from "@playwright/test";
import {
  getAllArticles,
  getArticleWithId,
} from "./api/dtos/articles/GetArticlesRequest";
import { createArticle } from "./api/dtos/articles/PostArticlesRequest";
import { articleBuilder } from "./api/dtos/articles/ArticleProvider";
import { Article } from "../test/api/dtos/article";
import { ArticlePostRequestDTO } from "./api/dtos/types/Article";

test("GET /articles", async ({ page }) => {
  (await getAllArticles()).forEach((element) => {
    expect(element).toHaveProperty(`body`);
  });
});

test("GET /articles/${id}", async () => {
  expect(await getArticleWithId()).toHaveProperty(`body`);
});

test("POST /articles", async () => {
  const newArticle: ArticlePostRequestDTO = articleBuilder()
    .withBody("customBody")
    .valueOf();
  const response: Article = await createArticle(newArticle);
  Object.keys(response).forEach((key) => {
    expect(response).toHaveProperty(key);
  });
});
