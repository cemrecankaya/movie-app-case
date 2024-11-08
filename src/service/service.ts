import { Axios, AxiosResponse } from "axios";
import {
  IGetMovieByIdorByTitleResponse,
  IGetMovieByIdParams,
  IGetMovieByTitleParams,
  IGetMoviePosterByIdParams,
  IGetMoviesBySearchParams,
  IGetMoviesBySearchResponse,
} from "./types";

const baseUrl = "https://www.omdbapi.com";
const imgUrl = "https://img.omdbapi.com";

const baseApi = new Axios({
  baseURL: baseUrl,
  params: { apikey: import.meta.env.VITE_API_KEY },
  transformResponse: (data) => JSON.parse(data),
});

const imgApi = new Axios({
  baseURL: imgUrl,
  params: { apikey: import.meta.env.VITE_API_KEY },
  transformResponse: (data) => JSON.parse(data),
});

async function getMovieByIdorByTitle(params: IGetMovieByIdParams | IGetMovieByTitleParams) {
  return await baseApi.get<any, AxiosResponse<IGetMovieByIdorByTitleResponse>>("/", { params: { ...params } });
}
async function getMoviesBySearch(params: IGetMoviesBySearchParams) {
  return await baseApi.get<any, AxiosResponse<IGetMoviesBySearchResponse>>("/", {
    params: { ...params },
    responseType: "json",
  });
}
async function getMoviePosterById(params: IGetMoviePosterByIdParams) {
  return await imgApi.get("/", { params: { ...params } });
}

export const Service = {
  getMovieByIdorByTitle: getMovieByIdorByTitle,
  getMoviesBySearch: getMoviesBySearch,
  getMoviePosterById: getMoviePosterById,
};
