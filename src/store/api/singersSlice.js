import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, getQuerySingerParams } from "../../utils";
import { BASE_URL } from "../../utils/config";

export const fetchSingers = createAsyncThunk('singers/query', async (query, thunkApi) => { 
   let uri = getQuerySingerParams(query);
   let results = await get(uri);
   return {
    results,
    query
   };
});

const singersSlice = createSlice({
  name: 'singers',
  initialState: {
    singers: [],
    loadding: false,
    error: null,
    hasNext: false,
    // 是否是第一次拉取
    initialed: true,
  },
  reducers: {
  },
  extraReducers: builder => {
    builder
    .addCase(fetchSingers.fulfilled, (state, action) => {
      const {query, results: {artists, more}} = action.payload;
      state.loadding = false;
      state.hasNext = more;
      if (query.offset === 0) {
        state.singers = artists;
      } else {
        state.singers = state.singers.concat(artists);
      }
    })
    .addCase(fetchSingers.pending, (state, action) => {
      if (state.initialed) {
        state.loadding = true;
        state.initialed = false;
      }
    })
    .addCase(fetchSingers.rejected, (state, action) => {
      state.loadding = false;
      state.error = action.error.message;
    })
  }
});

export const { setCategory, setAlpha, setOffset } = singersSlice.actions;

export const selectSingers = state => state.singers;

export default singersSlice;