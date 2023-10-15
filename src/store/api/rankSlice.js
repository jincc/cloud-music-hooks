import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";

export const fetchRankList = createAsyncThunk(
  'rank/list',
  async () => {
    let results = await get('/toplist/detail');
    return results.list;
  }
);

const rankSlice = createSlice({
  name: "rank",
  initialState: {
    //官方版数据
    official: [],
    //全球榜数据
    worldwide: [],
    loadding: false
  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(fetchRankList.fulfilled, (state, action) => {
      let worldwideList = []
      let otherList = []
      action.payload.forEach(element => {
        if (element.tracks && element.tracks.length > 0) {
          otherList.push(element)
        } else {
          worldwideList.push(element)
        }
      })
      state.official = otherList;
      state.worldwide = worldwideList;
      state.loadding = false;
    })
    .addCase(fetchRankList.pending, (state, action) => {
      state.loadding = true;
    })
  }
});

export default rankSlice;

export const selectRank = state => state.rank;