import { baseApi } from "@/redux/api/baseApi";

const productReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => ({
        url: "/review/create-review",
        method: "POST",
        body: payload,
      }),
    }),
    getUserReviews: builder.query({
      query: () => ({
        url: "/review/user-reviews",
        method: "GET",
      }),
    }),
    updateReview: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/review/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetUserReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = productReviewApi;
