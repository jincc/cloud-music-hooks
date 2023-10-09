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
        transformResponse: result => result.list
      }),
      // 热门分类
      getHotCategory: build.query({
        query: () => `/playlist/hot`,
        transformResponse: result => result.tags
      }),
      // 热门歌手
      getHotSingers: build.query({
        query: ({ offset }) => `/top/artists?offset=${offset}`,
        transformResponse: result => result.artists
      }),
      //根据分类查询接口
      getSingersByCategory: build.query({
        query: ({ offset, category, alpha }) =>
          `/artist/list?offset=${offset}&cat=${category}&initial=${alpha.toLowerCase()}`,
        transformResponse: result => result.artists
      })
    }
  }
})

export default cloudApi

export const {
  useGetRankListQuery,
  useGetHotCategoryQuery,
  useGetHotSingersQuery,
  useGetSingersByCategoryQuery
} = cloudApi
