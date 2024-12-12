import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ searchTerm, price, category, limit }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (price) params.append("price", price);
        if(limit) params.append("limit", limit)

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
    getFlashSaleProducts: builder.query({
      query: ({ limit }) => {
        console.log(limit);
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);

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
  useGetFlashSaleProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDuplicateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
