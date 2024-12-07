import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWithEmail: builder.query({
      query: (email) => ({
        url: `/user/user-email?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserWithEmailQuery } = userApi;
