import { Article } from "../types/Article";
import { baseURL } from "../../baseURL";
import axios from "axios";

export const getAllArticles = async () => {
  const response = await axios.get<Article[]>(`${baseURL}/api/articles`);
  return response.data;
};

export const getArticleWithId = async (id: number = 1) => {
  const response = await axios.get<Article>(`${baseURL}/api/articles/${id}`);
  return response.data;
};
