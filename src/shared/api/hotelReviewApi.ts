// src/shared/api/tourReviewApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export interface CreateReviewDto {
  hotelId: string;
  rating: number;
  comment: string;
  images?: string[];
}

export const hotelReviewApi = createApi({
  reducerPath: "hotelReviewApi",
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
        url: "/review/hotel",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = hotelReviewApi;
