import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({page, limit}) => {
        const params = new URLSearchParams();

        if(page) params.append("page", page)
        if(limit) params.append("limit", limit)

        return {
          url: `/category?${params.toString()}`,
          method: "GET",
        }
      },
      providesTags: ["Categories"]
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/category/create-category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Categories"]
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"]
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
