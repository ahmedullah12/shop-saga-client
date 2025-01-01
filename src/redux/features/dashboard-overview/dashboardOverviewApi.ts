import { baseApi } from "@/redux/api/baseApi";

const dashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOverviewData: builder.query({
      query: () => ({
        url: `/dashboard-overview`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOverviewDataQuery } = dashboardOverviewApi;
