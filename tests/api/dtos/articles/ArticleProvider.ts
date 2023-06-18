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
