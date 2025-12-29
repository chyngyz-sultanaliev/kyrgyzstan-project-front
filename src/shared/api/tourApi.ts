// src/shared/api/tourApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

/* ===== TYPES ===== */

export interface User {
  username: string;
  avatar: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  Images: string[];
  createdAt: string;
  user: User;
}

export interface TourDay {
  id: string;
  dayNumber: number;
  description: string;
  tourId: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  seaLevel: string;
  walk: number;
  byCar: number;
  days: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
  tourDays?: TourDay[];
}

export interface ToursResponse {
  success: boolean;
  tours: Tour[];
}

export interface TourResponse {
  success: boolean;
  tours: Tour; // если бекенд так возвращает
}

/* ===== API ===== */

export const tourApi = createApi({
  reducerPath: "tourApi",
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

  tagTypes: ["Tour"],

  endpoints: (builder) => ({
    getTours: builder.query<Tour[], void>({
      query: () => "/tour/get",
      transformResponse: (res: ToursResponse) => res.tours,
      providesTags: [{ type: "Tour", id: "LIST" }],
    }),

    getTourById: builder.query<Tour, string>({
      query: (id) => `/tour/get/${id}`,
      transformResponse: (res: TourResponse) => res.tours,
      providesTags: (result, error, id) => [{ type: "Tour", id }],
    }),
    createTour: builder.mutation<Tour, FormData | Partial<Tour>>({
      query: (data) => ({
        url: `/tour/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Tour", id: "LIST" }],
    }),
    updateTour: builder.mutation<
      Tour,
      { id: string; data: Partial<Tour> | FormData }
    >({
      query: ({ id, data }) => ({
        url: `/tour/put/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Tour", id },
        { type: "Tour", id: "LIST" },
      ],
    }),

    deleteTour: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/tour/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tour", id: "LIST" }],
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourByIdQuery,
  useUpdateTourMutation,
  useDeleteTourMutation,
  useCreateTourMutation,
} = tourApi;
