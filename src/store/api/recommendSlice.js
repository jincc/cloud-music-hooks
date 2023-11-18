import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get } from '../../utils'

export const fetchBanners = createAsyncThunk('recommend/banners', async () => {
  let results = await get('/banner')
  return results.banners
})

export const fetchAlbumList = createAsyncThunk('recommend/albums', async () => {
  let results = await get('/personalized')
  return results.result
})

export const fetchHomeData = createAsyncThunk('recommend/home', async () => {
  let result = await get('/homepage/block/page')
  return result.data.blocks
})

const recommendSlice = createSlice({
  name: 'recommend',
  initialState: {
    //banner
    banners: [],
    //九宫格
    dragonBalls: [],
    //推荐歌单
    albums: [],
    //新歌新碟
    newAlbumSongs: [],
    loadding: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHomeData.pending, (state, action) => {
        state.loadding = true
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loadding = false
        //数据解析
        const data = action.payload;
        let result = data.find(e => e.blockCode === 'HOMEPAGE_BANNER')
        if (result) {
          const banners = result.extInfo.banners;
          state.banners = banners;
        }

        result = data.find(e => e.blockCode === 'HOMEPAGE_BLOCK_OLD_DRAGON_BALL')
        if (result && result.creatives.length > 0) {
          const balls = result.creatives[0].resources;
          state.dragonBalls = balls;
        }
        result = data.find(e => e.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD')
        if (result) {
          const albums = result.creatives;
          state.albums = albums;
        }
        //新歌新碟
        result = data.find(e => e.blockCode === 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG')
        if (result) {
          const albums = result.creatives;
          state.newAlbumSongs = albums;
        }
        
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loadding = false
      })
  }
})

export default recommendSlice

export const selectRecommend = state => state.recommend
