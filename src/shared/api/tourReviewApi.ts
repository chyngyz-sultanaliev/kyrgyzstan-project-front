// src/shared/api/tourReviewApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export interface CreateReviewDto {
  tourId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export const tourReviewApi = createApi({
  reducerPath: "tourReviewApi",
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
  endpoints: (builder) => ({
    createReview: builder.mutation<any, CreateReviewDto>({
      query: (body) => ({
        url: "/review/tour",
        method: "POST",
        body,
      }),
    }),
  }),
});

// ⬇️ МЫНА УШУ САП МААНИЛҮҮ
export const { useCreateReviewMutation } = tourReviewApi;
