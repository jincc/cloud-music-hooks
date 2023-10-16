import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";

export const fetchBanners = createAsyncThunk('recommend/banners', 
  async () => {
    let results = await get('/banner');
    return results.banners;
});


export const fetchAlbumList = createAsyncThunk('recommend/albums',
  async () => {
    let results = await get('/personalized');
    return results.result;
});


const recommendSlice = createSlice({
  name: 'recommend',
  initialState: {
    banners: [],
    albums: []
  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      state.banners = action.payload;
    })
    .addCase(fetchAlbumList.fulfilled, (state, action) => {
      state.albums = action.payload;
    })
  }
});

export default recommendSlice;

export const selectRecommend = (state) => state.recommend;