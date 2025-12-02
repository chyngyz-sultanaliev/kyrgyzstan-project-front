// src/shared/api/tourApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const tourApi = createApi({
  reducerPath: "tourApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getTours: builder.query<Tour[], void>({
      query: () => "/tour/get",
      transformResponse: (response: ToursResponse) => response.tours,
    }),
    getTourById: builder.query<Tour, string>({
      query: (id) => `/tour/get/${id}`,
      transformResponse: (response: ToursResponse) => response.tours[0],
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourByIdQuery,
  util: tourApiUtil,
} = tourApi;
