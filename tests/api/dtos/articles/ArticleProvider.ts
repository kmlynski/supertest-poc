import { faker } from "@faker-js/faker";
import { ArticlePostRequestDTO } from "../types/Article";

export const getRandomArticle = (): ArticlePostRequestDTO => {
  return {
    user_id: parseInt(faker.random.numeric(1)),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    date: faker.date.past().toString(),
    image: "\\data\\articles\\image_1591133479.7144732.jpg",
  };
};

export const articleBuilder = (object = getRandomArticle()) => {
  return {
    valueOf() {
      return object;
    },
    withTitle(title: ArticlePostRequestDTO["title"]) {
      return articleBuilder({ ...object, title });
    },
    withBody(body: ArticlePostRequestDTO["body"]) {
      return articleBuilder({ ...object, body });
    },
  };
};
