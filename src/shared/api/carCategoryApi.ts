// src/shared/api/carCategoryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "./carApi";

export interface CarCategory {
  id: string;
  name: string;
  images: string;
  seats: number;
  withDriver: boolean;
  createdAt: string;
  updatedAt: string;
  cars?: Car[];
}

export const carCategoryApi = createApi({
  reducerPath: "carCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCarCategories: builder.query<CarCategory[], void>({
      query: () => "/categories/car",
      transformResponse: (res: CarCategory[]) => res,
    }),
    getCarCategoryById: builder.query<CarCategory, string>({
      query: (id) => `/categories/car/${id}`,
      transformResponse: (res: CarCategory) => res,
    }),
  }),
});

export const { useGetCarCategoriesQuery, useGetCarCategoryByIdQuery } =
  carCategoryApi;
