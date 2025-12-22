// src/shared/api/hotelApi.ts
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

export interface Hotel {
  id: string;
  title: string;
  description: string;
  images: { img: string }[];
  sleepingPlaces: number;
  maxGuests: number;
  area: number;
  floor: number;
  landArea: number;
  housingType: string;
  address: string;
  pool: boolean;
  sauna: boolean;
  billiard: boolean;
  tennis: boolean;
  playstation: boolean;
  music: boolean;
  wifi: boolean;
  priceWeekday: number;
  priceFriday: number;
  priceSaturday: number;
  priceSunday: number;
  fullWeekend: number;
  newYearPrice: number;
  januaryPrice: number;
  deposit: number;
  checkIn: string;
  checkOut: string;
  importantInfo: string;
  extraFee: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
}

export interface HotelsResponse {
  success: boolean;
  hotels: Hotel[];
}

// ===== RTK Query API =====
export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getHotels: builder.query<Hotel[], void>({
      query: () => "/hotel/get",
      transformResponse: (response: HotelsResponse) => response.hotels,
    }),
    getHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotel/get/${id}`,
      transformResponse: (response: { success: boolean; hotels: Hotel }) =>
        response.hotels,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  util: hotelApiUtil,
} = hotelApi;
