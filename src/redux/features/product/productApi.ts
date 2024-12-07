import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getFlashSaleProducts: builder.query({
      query: () => ({
        url: "/products/flash-sale",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetFlashSaleProductsQuery } =
  productApi;
