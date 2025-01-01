import { baseApi } from "@/redux/api/baseApi";

const dashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOverviewData: builder.query({
      query: () => ({
        url: `/dashboard-overview`,
        method: "GET",
      }),
    }),
    getVendorOverviewData: builder.query({
      query: (id) => ({
        url: `/dashboard-overview/vendor-overview/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOverviewDataQuery, useGetVendorOverviewDataQuery } = dashboardOverviewApi;
