import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        return {
          url: `/user?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),
    getUserWithEmail: builder.query({
      query: (email) => ({
        url: `/user/user-email?email=${email}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    followShop: builder.mutation({
      query: (shopId) => ({
        url: `/user/follow-shop/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users", "Shops"],
    }),
    getAllSubscribeUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        return {
          url: `/user/subscribe-users?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    userSubscribe: builder.mutation({
      query: (payload) => ({
        url: "/user/subscribe-user",
        method: "POST",
        body: payload,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/user/suspend-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserWithEmailQuery,
  useUpdateUserMutation,
  useFollowShopMutation,
  useGetAllSubscribeUsersQuery,
  useUserSubscribeMutation,
  useDeleteUserMutation,
  useSuspendUserMutation,
} = userApi;
