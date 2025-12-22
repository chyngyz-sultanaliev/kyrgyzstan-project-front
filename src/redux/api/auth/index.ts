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
    RegisterUser: build.mutation<AUTH.LoginResponse, AUTH.RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    RequestReset: build.mutation<AUTH.Message, AUTH.RequestResset>({
      query: (data) => ({
        url: "/auth/request-reset",
        method: "POST",
        body: data,
      }),
    }),
    VerifyCode: build.mutation<AUTH.Message, AUTH.VerifyCode>({
      query: (data) => ({
        url: "/auth/verify-code",
        method: "POST",
        body: data,
      }),
    }),
    ResetPassword: build.mutation<AUTH.Message, AUTH.ResetPassword>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRequestResetMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = api;
