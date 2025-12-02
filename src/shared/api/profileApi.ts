// src/shared/api/profileApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Favorite {
  id: string;
  userId: string;
  itemId: string;
  itemType: "CAR" | "HOTEL" | "TOUR";
  createdAt: string;
}

export interface ProfileUser {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  isAdmin: boolean;
  favorites: Favorite[];
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  user: ProfileUser;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // если токен в localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileUser, void>({
      query: () => "/auth/profile",
      transformResponse: (response: ProfileResponse) => response.user,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
