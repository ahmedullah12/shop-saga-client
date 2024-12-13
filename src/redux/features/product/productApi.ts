import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ searchTerm, price, category, limit, page }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("searchTerm", searchTerm);
        if (price) params.append("price", price);
        if(limit) params.append("limit", limit)
        if(page) params.append("page", page)

        if (category && Array.isArray(category)) {
          params.append("category", category.join(","));
        } else if (category) {
          params.append("category", category);
        }

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
    getVendorProducts: builder.query({
      query: ({ shopId, limit, page }) => {
        const params = new URLSearchParams();

        if(shopId) params.append("shopId", shopId)
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/products/vendor-products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"]
    }),
    getFlashSaleProducts: builder.query({
      query: ({ limit, page }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/products/flash-sale?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"]
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"]
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/products/create-product",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Products"]
    }),
    duplicateProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/duplicate-product/${productId}`,
        method: "POST"
      }),
      invalidatesTags: ["Products"]
    }),
    updateProduct: builder.mutation({
      query: ({payload, id}) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Products"]
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Products"]
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetVendorProductsQuery,
  useGetFlashSaleProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDuplicateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
