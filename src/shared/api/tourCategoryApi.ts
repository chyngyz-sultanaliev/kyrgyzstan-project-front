// src/shared/api/tourCategoryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tour } from "./tourApi";

export interface TourCategory {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  tours?: Tour[];
}

export const tourCategoryApi = createApi({
  reducerPath: "tourCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getTourCategories: builder.query<TourCategory[], void>({
      query: () => "/categories/tour",
      transformResponse: (res: TourCategory[]) => res,
    }),
    getTourCategoryById: builder.query<TourCategory, string>({
      query: (id) => `/categories/tour/${id}`,
      transformResponse: (res: TourCategory) => res,
    }),
  }),
});

export const { useGetTourCategoriesQuery, useGetTourCategoryByIdQuery } =
  tourCategoryApi;
