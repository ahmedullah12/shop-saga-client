import { baseApi } from "@/redux/api/baseApi";

const productReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => ({
        url: "/review/create-review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    getUserReviews: builder.query({
      query: ({limit, page}) => {
        const params = new URLSearchParams();

        if(page) params.append("page", page);
        if(limit) params.append("limit", limit);


        return {
          url: `/review/user-reviews?${params.toString()}`,
          method: "GET",
        }
      },
      providesTags: ["Reviews"],
    }),
    getShopProductsReviews: builder.query({
      query: ({shopId, limit, page}) => {
        const params = new URLSearchParams();

        if(shopId) params.append("shopId", shopId)
        if(limit) params.append("limit", limit)
        if(page) params.append("page", page)

        return {
          url: `/review/shop-product-reviews?${params.toString()}`,
          method: "GET",
        }
      },
    }),
    updateReview: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/review/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
    createReplyReview: builder.mutation({
      query: ({reviewId, payload}) => {
        console.log(payload);
        return {
          url: `/review/reply-review?reviewId=${reviewId}`,
          method: "PUT",
          body: payload,
        }
      }
    })
  }),
});

export const {
  useCreateReviewMutation,
  useGetUserReviewsQuery,
  useGetShopProductsReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useCreateReplyReviewMutation,
} = productReviewApi;
