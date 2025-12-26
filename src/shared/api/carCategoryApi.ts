// src/shared/api/carCategoryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "./carApi";
import Cookies from "js-cookie";
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

export interface CarCategoryCreateUpdate {
  name: string;
  images: string;
  seats: number;
  withDriver: boolean;
}

export const carCategoryApi = createApi({
  reducerPath: "carCategoryApi",
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
  tagTypes: ["CarCategory"],
  endpoints: (builder) => ({
    // GET ALL
    getCarCategories: builder.query<CarCategory[], void>({
      query: () => "/categories/car",
      transformResponse: (res: CarCategory[]) => res,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "CarCategory" as const,
                id,
              })),
              { type: "CarCategory" as const, id: "LIST" },
            ]
          : [{ type: "CarCategory" as const, id: "LIST" }],
    }),
    // GET ONE
    getCarCategoryById: builder.query<CarCategory, string>({
      query: (id) => `/categories/car/${id}`,
      transformResponse: (res: CarCategory) => res,
      providesTags: (result, error, id) => [{ type: "CarCategory", id }],
    }),
    // CREATE
    createCarCategory: builder.mutation<CarCategory, CarCategoryCreateUpdate>({
      query: (data) => ({
        url: "/categories/car",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarCategory"],
    }),
    // UPDATE
    updateCarCategory: builder.mutation<
      CarCategory,
      { id: string; data: Partial<CarCategoryCreateUpdate> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/car/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "CarCategory", id }],
    }),
    // DELETE
    deleteCarCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CarCategory"],
    }),
  }),
});

export const {
  useGetCarCategoriesQuery,
  useGetCarCategoryByIdQuery,
  useCreateCarCategoryMutation,
  useUpdateCarCategoryMutation,
  useDeleteCarCategoryMutation,
} = carCategoryApi;
