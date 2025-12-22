import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./hotelApi";


export interface Review {
  id: string;
  rating: number;
  comment: string;
  Images: string[];
  createdAt: string;
  user: User;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // эгер auth cookie болсо
  }),
  endpoints: (builder) => ({
    createReview: builder.mutation<Review, FormData>({
      query: (formData) => ({
        url: "/review/create",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;
