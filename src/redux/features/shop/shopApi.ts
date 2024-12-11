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
            })
        })
    })
});

export const { useCreateShopMutation, useGetUserShopQuery } = shopApi;