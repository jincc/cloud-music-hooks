import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cloudApi = createApi({
  name: 'cloud',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3300",
    credentials: 'include'
  }),
  endpoints: builder => {
    return {
      getRankList: builder.query({
        query: '/toplist/detail'
      })
    }
  }
});

export default cloudApi;

export const { useGetRankListQuery } = cloudApi;