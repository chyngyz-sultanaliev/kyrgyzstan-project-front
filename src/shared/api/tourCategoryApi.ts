import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tour } from "./tourApi";
import Cookies from "js-cookie";

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
  tagTypes: ["TourCategory"], // 🔹 добавляем
  endpoints: (builder) => ({
    getTourCategories: builder.query<TourCategory[], void>({
      query: () => "/categories/tour",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "TourCategory" as const,
                id,
              })),
              { type: "TourCategory" as const, id: "LIST" },
            ]
          : [{ type: "TourCategory" as const, id: "LIST" }],
    }),
    getTourCategoryById: builder.query<TourCategory, string>({
      query: (id) => `/categories/tour/${id}`,
      providesTags: (result, error, id) => [{ type: "TourCategory", id }],
    }),
    createTourCategory: builder.mutation<TourCategory, Partial<TourCategory>>({
      query: (data) => ({
        url: "/categories/tour",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "TourCategory", id: "LIST" }],
    }),
    updateTourCategory: builder.mutation<
      TourCategory,
      { id: string; data: Partial<TourCategory> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/tour/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "TourCategory", id: "LIST" }],
    }),
    deleteTourCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/tour/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TourCategory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTourCategoriesQuery,
  useGetTourCategoryByIdQuery,
  useCreateTourCategoryMutation,
  useUpdateTourCategoryMutation,
  useDeleteTourCategoryMutation,
} = tourCategoryApi;
