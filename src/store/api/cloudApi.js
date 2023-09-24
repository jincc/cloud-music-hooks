import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cloudApi = createApi({
  reducerPath: 'cloud',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3300',
    credentials: 'include'
  }),
  endpoints: build => {
    return {
      // 排行榜数据
      getRankList: build.query({
        query: () => '/toplist/detail',
        transformResponse: (result) => result.list
      })
    }
  }
})

export default cloudApi;

export const { useGetRankListQuery } = cloudApi;
