// src/shared/api/car
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

export interface Car {
  id: string;
  title: string;
  description: string;
  image: string;
  transmission: string;
  seat: number;
  year: number;
  engine: string;
  drive: string;
  fuelType: string;
  pricePerDay: number;
  minDriverAge: number;
  categoryId: string;
  withDriver: boolean;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}

export interface CarsResponse {
  success: boolean;
  cars: Car[];
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => "/cars/get",
      transformResponse: (response: CarsResponse) => response.cars,
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/car/get/${id}`,
      transformResponse: (response: CarsResponse) => response.cars[0], // берём первый элемент
    }),
  }),
});

export const { useGetCarsQuery, useGetCarByIdQuery, util: carApiUtil } = carApi;
