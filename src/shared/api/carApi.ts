// src/shared/api/car.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Интерфейсы
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
  image: { img: string }[];
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
  reviews?: Review[];
}

export interface CarsResponse {
  success: boolean;
  cars: Car[];
}
export interface CarResponse {
  success: boolean;
  cars: Car;
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // Примечание: Content-Type для FormData браузер установит САМ автоматически
      // вместе с boundary. Руками его ставить НЕЛЬЗЯ.
      return headers;
    },
  }),

  tagTypes: ["Car"],
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => "/car/get",
      transformResponse: (res: CarsResponse) => res.cars,
      providesTags: [{ type: "Car", id: "LIST" }],
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/car/get/${id}`,
      transformResponse: (res: CarResponse) => res.cars,
      providesTags: (result, error, id) => [{ type: "Car", id }],
    }),
    createCar: builder.mutation<Car, FormData | Partial<Car>>({
      query: (data) => ({
        url: `/car/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Car", id: "LIST" }],
    }),
    // ОСНОВНОЕ ИЗМЕНЕНИЕ ЗДЕСЬ: разрешаем передавать FormData
    updateCar: builder.mutation<
      Car,
      { id: string; data: FormData | Partial<Car> }
    >({
      query: ({ id, data }) => ({
        url: `/car/put/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Car", id },
        { type: "Car", id: "LIST" },
      ],
    }),
    deleteCar: builder.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/car/delete`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "Car", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
