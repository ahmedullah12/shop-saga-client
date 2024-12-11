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
      query: () => ({
        url: "/review/user-reviews",
        method: "GET",
      }),
      providesTags: ["Reviews"],
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
  }),
});

export const {
  useCreateReviewMutation,
  useGetUserReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = productReviewApi;
