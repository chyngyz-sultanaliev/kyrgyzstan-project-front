// src/shared/api/profileApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

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
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileUser, void>({
      query: () => "/auth/profile",
      transformResponse: (response: ProfileResponse) => response.user,
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<
      ProfileResponse,
      { username?: string; email?: string; avatar?: string }
    >({
      query: (body) => ({
        url: "/auth/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
