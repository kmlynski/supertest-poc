export interface Article {
  id: number;
  user_id: number;
  title: string;
  body: string;
  date: string;
  image: string;
}

export type ArticlePostRequestDTO = Omit<Article, "id">;
