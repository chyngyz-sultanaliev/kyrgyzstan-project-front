// src/shared/api/hotelApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
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
// src/shared/api/hotelApi.ts
export const hotelApi = createApi({
  reducerPath: "hotelApi",
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
  tagTypes: ["Hotel"],
  endpoints: (builder) => ({
    getHotels: builder.query<Hotel[], void>({
      query: () => "/hotel/get",
      transformResponse: (response: HotelsResponse) => response.hotels,
      providesTags: [{ type: "Hotel", id: "LIST" }],
    }),
    getHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotel/get/${id}`,
      transformResponse: (response: { success: boolean; hotels: Hotel }) =>
        response.hotels,
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
    createHotel: builder.mutation<Hotel, FormData | Partial<Hotel>>({
      query: (data) => ({
        url: `/hotel/post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),

    updateHotel: builder.mutation<
      Hotel,
      { id: string; data: FormData | Partial<Hotel> }
    >({
      query: ({ id, data }) => ({
        url: `/hotel/patch/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Hotel", id },
        { type: "Hotel", id: "LIST" },
      ],
    }),
    deleteHotel: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/hotel/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  util: hotelApiUtil,
} = hotelApi;
