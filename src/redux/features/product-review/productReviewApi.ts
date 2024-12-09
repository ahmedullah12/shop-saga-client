import { baseApi } from "@/redux/api/baseApi";

const productReviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (payload) => ({
                url: "/review/create-review",
                method: "POST",
                body: payload
            })
        })
    })
});

export const { useCreateReviewMutation } = productReviewApi;