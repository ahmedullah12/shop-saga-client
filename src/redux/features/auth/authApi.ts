import { baseApi } from "@/redux/api/baseApi";
import { RootState } from "@/redux/store";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: payload,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({token , payload}) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
        headers: {
          Authorization: token
        }
      }),
    }),
  }),
});

export const useCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;

export const {
  useRegisterMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = authApi;
