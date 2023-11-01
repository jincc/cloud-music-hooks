import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkMp3, get, getMp3Url } from "../../utils";
// 当前播放模式
const PlayMode = {
  SEQUENCE: 0,
  RANDOM: 1,
  LOOP: 2
};
// // 获取歌词
// export const fetchLyricThunk = createAsyncThunk('player/lyric', 
//   async (id) => {
//     const result = await get(`/lyric?id=${id}`);
//     return result;
// });

//尝试播放歌曲，不能播放的话，切到下一首
export const tryPlaySongThunk = createAsyncThunk('player/play',
  async (id, {dispatch, getState}) => {
    await dispatch(setOnReady(false));
    if (await checkMp3(getMp3Url(id))) {
      // const lyric = await dispatch(fetchLyricThunk(id)).unwrap();
      // console.log(lyric);
      await dispatch(setOnReady(true));
    } else {
      //开始下一首播放
      await dispatch(playNext());
    }
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
    //是否准备好播放，开始播放之前会经历 地址校验和歌词获取
    isReady: false,
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
    setOnReady: (state, action) => {
      state.isReady = action.payload;
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
    },
    //播放下一首
    playNext: (state, action) => {
      let {mode, currentIndex, playlist} = state;
      switch (mode) {
        case PlayMode.SEQUENCE:
          currentIndex += 1;
          if (currentIndex === playlist.length) {
            currentIndex = 0;
          }
          state.currentIndex = currentIndex;
          break;
      
        default:
          break;
      }
    }
  },
  extraReducers: builder => {
    // builder.addCase(fetchLyricThunk.fulfilled, (state, action) => {
    //   state.lyric = action.payload;
    // })
  }
});

export default playerSlice;

export const { startSequencePlay, setOnReady, setPlayState, setCurrentPlayTimeOffset, playNext } = playerSlice.actions;

export const selectPlayerState = state => state.player;