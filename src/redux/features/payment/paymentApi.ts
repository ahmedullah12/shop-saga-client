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
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
