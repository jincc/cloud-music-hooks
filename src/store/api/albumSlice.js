// 歌单页
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";
export const fetchAlbumSongsList = createAsyncThunk('album/songlist', 
  async (id) => {
    let results = await get('/playlist/detail', {id});
    return results.playlist;
  })

const albumSlice = createSlice({
  name: 'album',
  initialState: {
    playlist: null,
    loadding: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAlbumSongsList.fulfilled, (state, action) => {
      state.playlist = action.payload;
      state.loadding = false;
    }).addCase(fetchAlbumSongsList.pending, (state, action) => {
      state.loadding = true;
    }).addCase(fetchAlbumSongsList.rejected, (state, action) => {
      state.loadding = false;
    })
  }
});


export default albumSlice;
export const selectAlbumState = (state) => state.album;