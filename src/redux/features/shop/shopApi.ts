import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (payload) => ({
        url: "/shop/create-shop",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users", "Shops"],
    }),
    getAllShop: builder.query({
      query: ({ limit, page }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/shop?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Shops"],
    }),
    getActiveShops: builder.query({
      query: ({ limit, page }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/shop/active-shops?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Shops"],
    }),
    getUserShop: builder.query({
      query: () => ({
        url: "/shop/user-shop",
        method: "GET",
      }),
      providesTags: ["Shops", "Products"],
    }),
    getSingleShop: builder.query({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["Shops", "Products", "Users"],
    }),
    updateShop: builder.mutation({
      query: (payload) => ({
        url: `/shop`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Shops"],
    }),
    blacklistShop: builder.mutation({
      query: (shopId) => ({
        url: `/shop/blacklist-shop/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Shops"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetAllShopQuery,
  useGetActiveShopsQuery,
  useGetUserShopQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
  useBlacklistShopMutation,
} = shopApi;
