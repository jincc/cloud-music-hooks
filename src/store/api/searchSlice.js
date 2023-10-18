import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";

export const fetchHotSearchKeywords = createAsyncThunk('search/hot',
  async() => {
    let results = await get('/search/hot');
    return results.result.hots;
});

export const fetchSuggestByKeyword = createAsyncThunk('search/suggest', 
  async (keywords) => {
    let result = await get('/search/suggest', {keywords});
    return result.result;
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    // 热门搜索
    hots: [],
    searchResults: {
      playlists: [], 
      artists: [], 
      songs: []
    }
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchHotSearchKeywords.fulfilled, (state, action) => {
      state.hots = action.payload;
    })
    .addCase(fetchSuggestByKeyword.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    })
  }
});

export default searchSlice;
export const selectSearchState = state => state.search;