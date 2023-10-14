import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuerySingerParams } from "../../utils";
import { BASE_URL } from "../../utils/config";

export const fetchSingers = createAsyncThunk('singers/query', async (query, thunkApi) => { 
   let uri = getQuerySingerParams(query);
   let response = await fetch(BASE_URL + uri);
   let json = await response.json();
   if (json.code !== 200) throw new Error(json.message);
   return {
    results: json,
    query
   };
});

const singersSlice = createSlice({
  name: 'singers',
  initialState: {
    singers: [],
    loadding: false,
    error: null,
    hasNext: false
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
      state.loadding = true;
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