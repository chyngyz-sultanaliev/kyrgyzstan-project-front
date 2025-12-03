// src/shared/api/favoriteApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car } from "./carApi";
import { Hotel } from "./hotelApi";
import { Tour } from "./tourApi";



export interface Favorite {
  id: string;
  itemType: "CAR" | "HOTEL" | "TOUR";
  createdAt: string;
  item: Car | Hotel | Tour | null;
}

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFavorites: builder.query<Favorite[], void>({
      query: () => "/favorite",
    }),
  }),
});

export const { useGetFavoritesQuery } = favoriteApi;
