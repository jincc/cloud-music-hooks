import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";

export const fetchSingerDetail = createAsyncThunk('singer/detail', 
  async(id) => {
    let result = await get(`/artists`, {id});
    return result;
  });

const singerDetailSlice = createSlice({
  name: 'singerDetail',
  initialState: {
    detail: null,
    loadding: true
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSingerDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.loadding = false;
    }).addCase(fetchSingerDetail.pending, (state, action) => {
      state.loadding = true;
    }).addCase(fetchSingerDetail.rejected, (state, action) => {
      state.loadding = false;
    })
  }
});

export default singerDetailSlice;
export const selectSingerDetailState = state => state.singerDetail;