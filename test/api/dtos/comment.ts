import { faker } from "@faker-js/faker";

export interface Comment {
  article_id: number;
  body: string;
  date: string;
  user_id?: number;
}

export const getRandomComment = (): Comment => {
  return {
    article_id: 1,
    body: faker.lorem.paragraph(),
    date: faker.date.past().toString(),
    user_id: 1,
  };
};
