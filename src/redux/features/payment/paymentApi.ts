import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment-collection/create-payment",
        method: "POST",
        body: payload,
      }),
    }),
    getAllPayments: builder.query({
      query: () => ({
        url: "/payment-collection",
        method: "GET"
      })
    }),
    getUserPayments: builder.query({
      query: () => ({
        url: "/payment-collection/my-payments",
        method: "GET"
      })
    }),
  }),
});

export const { useCreatePaymentMutation, useGetAllPaymentsQuery, useGetUserPaymentsQuery } = paymentApi;
