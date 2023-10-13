import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuerySingerParams } from "../../utils";
import { BASE_URL } from "../../utils/config";

export const fetchSingers = createAsyncThunk('singers/query', async (query, thunkApi) => { 
   let uri = getQuerySingerParams(query);
   console.log(uri);
   let response = await fetch(BASE_URL + uri);
   return await response.json();
});

const singersSlice = createSlice({
  name: 'singers',
  initialState: {
    singers: [],
    category: null,
    alpha: null,
    offset: 0,
    loadding: false,
    error: null
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.singers = [];
      state.offset = 0;
    },
    setAlpha: (state, action) => {
      state.alpha = action.payload;
      state.singers = [];
      state.offset = 0;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchSingers.fulfilled, (state, action) => {
      state.loadding = false;
      if (state.offset === 0) {
        state.singers = action.payload;
      } else {
        state.singers = state.singers.concat(action.payload);
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