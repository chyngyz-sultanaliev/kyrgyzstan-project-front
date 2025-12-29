// src/shared/api/newsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

/* ===== TYPES ===== */

export interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsRes {
  success: boolean;
  news: News[];
}

/* ===== API ===== */

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query<News[], void>({
      query: () => "/news",
      transformResponse: (res: NewsRes) => res.news,
      providesTags: ["News"],
    }),

    createNews: builder.mutation<News, Partial<News>>({
      query: (body) => ({
        url: "/news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    deleteNews: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
