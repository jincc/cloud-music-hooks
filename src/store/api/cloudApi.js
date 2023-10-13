import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getQuerySingerParams } from '../../utils';
import { BASE_URL } from '../../utils/config';

const cloudApi = createApi({
  reducerPath: 'cloud',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include'
  }),
  endpoints: build => {
    return {
      // 排行榜数据
      getRankList: build.query({
        query: () => '/toplist/detail',
        transformResponse: result => result.list
      }),
      // 热门歌单分类
      getHotCategory: build.query({
        query: () => `/playlist/hot`,
        transformResponse: result => result.tags
      }),
      //根据分类查询接口
      getSingersByCategory: build.query({
        // 设置query查询信息
        query: (args) => getQuerySingerParams(args),
        //转换response
        transformResponse: result => result.artists,
        //自定义缓存key，删除offset字段目的是为了分页查询时命中同一个缓存
        serializeQueryArgs: ({queryArgs}) => {
          const newArgs = {...queryArgs};
          if (newArgs.offset != null) {
            delete newArgs.offset;
          }
          return newArgs;
        },
        merge: (currentCache, newItems, {arg}) => {
          console.log(arg);
          if (arg.offset !== 0) {
            //说明是上拉刷新
            currentCache.push(...newItems);
          } else {
            currentCache = newItems;
          }
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
      }),
    }
  }
})

export default cloudApi

export const {
  useGetRankListQuery,
  useGetHotCategoryQuery,
  useGetSingersByCategoryQuery,
  useLazyGetSingersByCategoryQuery
} = cloudApi
