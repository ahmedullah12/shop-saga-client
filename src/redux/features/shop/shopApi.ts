import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createShop: builder.mutation({
            query: (payload) => ({
                url: "/shop/create-shop",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Users", "Shops"]
        }),
        getUserShop: builder.query({
            query: () => ({
                url: "/shop/user-shop",
                method: "GET"
            }),
            providesTags: ["Shops", "Products"]
        }),
        updateShop: builder.mutation({
            query: (payload) => ({
                url: `/shop`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["Shops"]
        })
    })
});

export const { useCreateShopMutation, useGetUserShopQuery, useUpdateShopMutation } = shopApi;