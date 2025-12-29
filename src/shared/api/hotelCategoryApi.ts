// src/shared/api/hotelCategoryApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Hotel } from "./hotelApi";
import Cookies from "js-cookie";
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
  tagTypes: ["HotelCategory"],
  endpoints: (builder) => ({
    getHotelCategories: builder.query<HotelCategory[], void>({
      query: () => "/categories/hotel",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "HotelCategory" as const,
                id,
              })),
              { type: "HotelCategory" as const, id: "LIST" },
            ]
          : [{ type: "HotelCategory" as const, id: "LIST" }],
    }),

    getHotelCategoryById: builder.query<HotelCategory, string>({
      query: (id) => `/categories/hotel/${id}`,
      providesTags: (result, error, id) => [{ type: "HotelCategory", id }],
    }),
    createHotelCategory: builder.mutation<
      HotelCategory,
      Partial<HotelCategory>
    >({
      query: (data) => ({
        url: "/categories/hotel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HotelCategory"],
    }),
    updateHotelCategory: builder.mutation<
      HotelCategory,
      { id: string; data: Partial<HotelCategory> }
    >({
      query: ({ id, data }) => ({
        url: `/categories/hotel/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "HotelCategory", id: "LIST" }],
    }),
    deleteHotelCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/hotel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HotelCategory"],
    }),
  }),
});

export const {
  useGetHotelCategoriesQuery,
  useGetHotelCategoryByIdQuery,
  useCreateHotelCategoryMutation,
  useUpdateHotelCategoryMutation,
  useDeleteHotelCategoryMutation,
} = hotelCategoryApi;
