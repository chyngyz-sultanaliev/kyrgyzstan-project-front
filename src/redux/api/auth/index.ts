import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<AUTH.LoginResponse, AUTH.LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false, // чтобы не перезаписывать существующие endpoints
});

export const { useLoginUserMutation } = api;
