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
      query: ({ limit, page }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/payment-collection?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getUserPayments: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/payment-collection/my-payments?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getShopPayments: builder.query({
      query: ({ limit, page }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/payment-collection/shop-payments?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetUserPaymentsQuery,
  useGetShopPaymentsQuery,
} = paymentApi;
