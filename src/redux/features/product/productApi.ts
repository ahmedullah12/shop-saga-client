import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ searchTerm }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"]
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
