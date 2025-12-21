import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOption) => {
  const result = await baseQuery(args, api, extraOption);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [""],
  endpoints: () => ({}),
});
