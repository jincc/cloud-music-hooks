import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../utils";
// 当前播放模式
const PlayMode = {
  SEQUENCE: 0,
  RANDOM: 1,
  LOOP: 2
};
// 获取歌词
export const fetchLyric = createAsyncThunk('player/lyric', 
  async (id) => {
    const result = await get(`/lyric?id=${id}`);
    return result;
});

//判断歌曲是否可播放
export const checkSongMp3AddressState = createAsyncThunk('player/state', 
  async (id) => {
    const result = await fetch(`https://music.163.com/song/media/outer/url?id=${id}.mp3`, {
      mode: 'no-cors'
    });
    console.log(result);
    return result;
});


const playerSlice = createSlice({
  name: 'player',
  initialState: {
    //元素播放列表，后续会通过mode改变playlist
    originPlayList: [],
    //存储播放列表
    playlist: [],
    //当前播放下标
    currentIndex: -1,
    //播放状态
    isPlaying: false,
    //播放模式(交互)
    mode: PlayMode.SEQUENCE,
    //是否展示播放列表(交互)
    isShowPlayList: false,
    //是否全屏模式(交互)
    isFullScreen: false,
    //歌词信息
    lyric: null,
    //播放进度
    progress: 0
  },
  reducers: {
    // 歌手页点击歌曲时，初始播放状态
    startSequencePlay: (state, action) => {
      const {playlist, index} = action.payload;
      state.originPlayList = playlist;
      state.currentIndex = index;
      state.playlist = playlist;
    },
    //播放状态
    setPlayState: (state, action) => {
      state.isPlaying = action.payload;
    },
    //当前播放进度
    setCurrentPlayTimeOffset: (state, action) => {
      const { currentIndex, playlist} = state;
      if (currentIndex !== -1 && playlist.length > currentIndex) {
        const song = playlist[currentIndex];
        const progress = action.payload * 1000 / song.dt;
        state.progress = progress;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLyric.fulfilled, (state, action) => {
      state.lyric = action.payload;
    })
  }
});

export default playerSlice;

export const { startSequencePlay, setPlayState, setCurrentPlayTimeOffset } = playerSlice.actions;

export const selectPlayerState = state => state.player;