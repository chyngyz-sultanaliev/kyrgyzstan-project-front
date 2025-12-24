// src/shared/api/favoriteApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "./carApi";
import { Hotel } from "./hotelApi";
import { Tour } from "./tourApi";
import Cookies from "js-cookie";

export interface Favorite {
  id: string;
  itemType: "CAR" | "HOTEL" | "TOUR";
  createdAt: string;
  hotel?: Hotel;
  car?: Car;
  tour?: Tour;
}

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  tagTypes: ["Favorite"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 📌 GET favorites
    getFavorites: builder.query<Favorite[], void>({
      query: () => "/favorite",
      providesTags: ["Favorite"],
    }),

    // ❤️ ADD favorite
    addFavorite: builder.mutation<
      Favorite,
      {
        itemType: "HOTEL" | "CAR" | "TOUR";
        hotelId?: string;
        carId?: string;
        tourId?: string;
      }
    >({
      query: (body) => ({
        url: "/favorite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorite"],
    }),

    // ❌ REMOVE favorite
    removeFavorite: builder.mutation<void, string>({
      query: (id) => ({
        url: `/favorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;
