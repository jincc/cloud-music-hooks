import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";

export const fetchAlbumDetail = createAsyncThunk('album/detail', 
  async (id) => {
    const result = await get(`/album?id=${id}`)
    return result
  });


const albumSlice = createSlice({
  name: 'album',
  initialState: {
    album: null,
    songs: [],
    loadding: false
  },
  extraReducers: builder => {
    builder.addCase(fetchAlbumDetail.fulfilled, (state, action) => {
      const {songs, album} = action.payload;
      state.songs = songs
      state.album = album
      state.loadding = false
    }).addCase(fetchAlbumDetail.pending, (state, action) => {
      state.loadding = true
    }).addCase(fetchAlbumDetail.rejected, (state, action) => {
      state.loadding = false
    })
  }
})

export default albumSlice;

export const selectAlbumDetailState = state => state.album