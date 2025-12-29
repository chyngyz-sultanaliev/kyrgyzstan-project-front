// src/shared/api/carReviewApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export interface CreateReviewDto {
  carId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export const carReviewApi = createApi({
  reducerPath: "carReviewApi",
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
    createReview: builder.mutation<CreateReviewDto, CreateReviewDto>({
      query: (body) => ({
        url: "/review/car",
        method: "POST",
        body,
      }),
    }),
  }),
});

// ⬇️ МЫНА УШУ САП МААНИЛҮҮ
export const { useCreateReviewMutation } = carReviewApi;
