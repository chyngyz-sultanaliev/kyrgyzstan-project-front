import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  news?: News[];
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<News[], void>({
      query: () => "/news",
      transformResponse: (res: News[]) => res,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
