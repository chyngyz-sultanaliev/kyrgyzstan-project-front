// src/shared/api/hotelCategoryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Hotel } from "./hotelApi";

export interface HotelCategory {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  hotels?: Hotel[];
}

export const hotelCategoryApi = createApi({
  reducerPath: "hotelCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getHotelCategories: builder.query<HotelCategory[], void>({
      query: () => "/categories/hotel",
      transformResponse: (res: HotelCategory[]) => res,
    }),
    getHotelCategoryById: builder.query<HotelCategory, string>({
      query: (id) => `/categories/hotel/${id}`,
      transformResponse: (res: HotelCategory) => res,
    }),
  }),
});

export const { useGetHotelCategoriesQuery, useGetHotelCategoryByIdQuery } =
  hotelCategoryApi;
