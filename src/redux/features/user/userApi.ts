import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWithEmail: builder.query({
      query: (email) => ({
        url: `/user/user-email?email=${email}`,
        method: "GET",
      }),
    }),
    followShop: builder.mutation({
      query: (shopId) => ({
        url: `/user/follow-shop/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users", "Shops"]
    })
  }),
});

export const { useGetUserWithEmailQuery, useFollowShopMutation } = userApi;
