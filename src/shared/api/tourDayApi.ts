// src/shared/api/tourDayApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export interface TourDay {
  id: string;
  dayNumber: number;
  description: string;
  tourId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TourDayCreateUpdate {
  dayNumber: number;
  description: string;
  tourId: string;
}
interface TourDaysResponse {
  success: boolean;
  data: TourDay[];
}

export const tourDayApi = createApi({
  reducerPath: "tourDayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TourDay"],
  endpoints: (builder) => ({
    getTourDays: builder.query<TourDaysResponse, void>({
      query: () => "/tour/days",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "TourDay" as const,
                id,
              })),
              { type: "TourDay" as const, id: "LIST" },
            ]
          : [{ type: "TourDay" as const, id: "LIST" }],
    }),

    createTourDay: builder.mutation<TourDay, TourDayCreateUpdate>({
      query: (data) => ({
        url: "/tour/days",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TourDay"],
    }),
    updateTourDay: builder.mutation<
      TourDay,
      { id: string; data: Partial<TourDayCreateUpdate> }
    >({
      query: ({ id, data }) => ({
        url: `/tour/days/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TourDay", id },
        { type: "TourDay", id: "LIST" },
      ],
    }),
    deleteTourDay: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tour/days/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TourDay"],
    }),
  }),
});

export const {
  useGetTourDaysQuery,
  useCreateTourDayMutation,
  useUpdateTourDayMutation,
  useDeleteTourDayMutation,
} = tourDayApi;
