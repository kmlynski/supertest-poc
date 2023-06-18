import { ArticlePostRequestDTO } from "../types/Article";
import { baseURL } from "../../baseURL";
import axios from "axios";

export const createArticle = async (article: ArticlePostRequestDTO) => {
  const response = await axios.post<ArticlePostRequestDTO>(
    `${baseURL}/api/articles`,
    article
  );
  return response.data;
};
