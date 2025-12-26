import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface CreateReviewDto {
  hotelId: string;
  text: string;
  rating: number;
  Images?: string[];
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  tagTypes: ["Review"],
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
    getHotelReviews: builder.query<any[], string>({
      query: (hotelId) => `/review/hotel/${hotelId}`, 
      providesTags: ["Review"],
    }),

    addHotelReview: builder.mutation<
      any,
      { hotelId: string; rating: number; comment: string }
    >({
      query: (body) => ({
        url: "/review/hotel",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetHotelReviewsQuery, useAddHotelReviewMutation } = reviewApi;
