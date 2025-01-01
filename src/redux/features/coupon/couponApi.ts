import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        return {
          url: `/coupon?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Coupons"],
    }),
    createCoupon: builder.mutation({
      query: (payload) => ({
        url: "/coupon/create-coupon",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
    claimCoupon: builder.mutation({
      query: (payload) => ({
        url: `/coupon/claim-coupon`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Coupons"],
    }),
    useCoupon: builder.mutation({
      query: (payload) => ({
        url: `/coupon/use-coupon`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useClaimCouponMutation,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useUseCouponMutation,
} = couponApi;
