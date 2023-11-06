import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkMp3, get, getMp3Url, shuffleSongList } from '../../utils'
import { PlayMode } from '../../utils/config'

// // 获取歌词
// export const fetchLyricThunk = createAsyncThunk('player/lyric',
//   async (id) => {
//     const result = await get(`/lyric?id=${id}`);
//     return result;
// });

//尝试播放歌曲，不能播放的话，切到下一首
export const tryPlaySongThunk = createAsyncThunk(
  'player/play',
  async (id, { dispatch, getState }) => {
    await dispatch(setOnReady(false))
    if (await checkMp3(getMp3Url(id))) {
      // const lyric = await dispatch(fetchLyricThunk(id)).unwrap();
      // console.log(lyric);
      await dispatch(setOnReady(true))
    } else {
      //开始下一首播放
      await dispatch(playNext())
    }
  }
)

export const tryPlayAndInsertSong = createAsyncThunk(
  'play/insert',
  async (id, { dispatch, getState }) => {
    const result = await get(`/song/detail?ids=${id}`)
    if (result.songs.length > 0) {
      dispatch(playAndInsertSong(result.songs[0]))
    }
  }
)

const initialState = {
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
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // 歌手页点击歌曲时，初始播放状态
    startSequencePlay: (state, action) => {
      const { playlist, index } = action.payload

      if (state.playlist.length === 0) {
        state.originPlayList = playlist
        state.currentIndex = index
        state.playlist = playlist
      } else {
        const currentSongId = playlist[index].id

        playlist.forEach(element => {
          if (
            state.playlist.findIndex(e => {
              return e.id === element.id
            }) === -1
          ) {
            state.playlist.push(element)
          }
          if (
            state.originPlayList.findIndex(e => {
              return e.id === element.id
            }) === -1
          ) {
            state.originPlayList.push(element)
          }
        })
        
        state.currentIndex = state.playlist.findIndex(e => e.id === currentSongId);
      }
    },
    //播放状态
    setPlayState: (state, action) => {
      state.isPlaying = action.payload
    },
    deleteCurrentIndex: (state, action) => {
      const willDeletePlaylistIndex = action.payload
      const isPlayingSong = willDeletePlaylistIndex === state.currentIndex
      const deleteSong = state.playlist[willDeletePlaylistIndex]
      //从原始列表中删除
      state.originPlayList.splice(
        state.originPlayList.findIndex(e => e.id === deleteSong.id),
        1
      )
      if (isPlayingSong) {
        state.playlist.splice(willDeletePlaylistIndex, 1)
      } else {
        state.playlist.splice(willDeletePlaylistIndex, 1)
        //判断删除的歌曲在前还是在后
        if (willDeletePlaylistIndex > state.currentIndex) {
          //无需更新currentindex
        } else {
          state.currentIndex--
        }
      }
    },
    //在当前位置插入歌曲
    playAndInsertSong: (state, action) => {
      const { currentIndex, playlist, originPlayList } = state
      const song = action.payload
      if (currentIndex !== -1) {
        const currentSong = playlist[currentIndex]

        if (playlist.findIndex(e => e.id === song.id) === -1) {
          playlist.splice(currentIndex, 0, song)
        }

        if (originPlayList.findIndex(e => e.id === song.id) === -1) {
          originPlayList.splice(
            originPlayList.findIndex(e => e.id === currentSong.id),
            0,
            song
          )
        }

        // 更新播放下标
        state.currentIndex = playlist.findIndex(e => e.id === song.id);
      } else {
        state.originPlayList = [song]
        state.playlist = [song]
        state.currentIndex = 0
      }
    },
    deleteAll: (state, action) => {
      return initialState
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload
    },
    //设置展示播放列表
    setShowPlayList: (state, action) => {
      state.isShowPlayList = action.payload
    },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload
    },
    //设置ready状态
    setOnReady: (state, action) => {
      state.isReady = action.payload
      state.isPlaying = action.payload
    },
    //当前播放进度
    setCurrentPlayTimeOffset: (state, action) => {
      const { currentIndex, playlist } = state
      if (currentIndex !== -1 && playlist.length > currentIndex) {
        const song = playlist[currentIndex]
        const progress = (action.payload * 1000) / song.dt
        state.progress = progress
      }
    },
    //通过手势更新播放进度
    setProgress: (state, action) => {
      state.progress = action.payload
    },
    //播放下一首
    playNext: (state, action) => {
      let { currentIndex, playlist } = state
      currentIndex += 1
      if (currentIndex === playlist.length) {
        currentIndex = 0
      }
      state.currentIndex = currentIndex
      // 循环模式下，拷贝下playlist 用来触发歌曲重新播放
      if (state.mode === PlayMode.LOOP) {
        state.playlist = [...state.playlist]
      }
    },
    playPrev: (state, action) => {
      let { currentIndex, playlist } = state
      currentIndex -= 1
      if (currentIndex === -1) {
        currentIndex = playlist.length - 1
      }
      state.currentIndex = currentIndex
      if (state.mode === PlayMode.LOOP) {
        state.playlist = [...state.playlist]
      }
    },
    //切换播放模式
    switchPlayMode: (state, action) => {
      const { mode, currentIndex, playlist } = state
      const currentSongId = playlist[currentIndex].id
      const newMode = (mode + 1) % 3
      switch (newMode) {
        case PlayMode.SEQUENCE:
          state.playlist = state.originPlayList
          state.currentIndex = state.playlist.findIndex(
            e => e.id === currentSongId
          )
          break
        case PlayMode.LOOP:
          state.playlist = [playlist[currentIndex]]
          state.currentIndex = 0
          break

        case PlayMode.RANDOM:
          state.playlist = shuffleSongList(state.originPlayList)
          state.currentIndex = state.playlist.findIndex(
            e => e.id === currentSongId
          )
          break

        default:
          break
      }

      state.mode = newMode
    }
  },
  extraReducers: builder => {
    // builder.addCase(fetchLyricThunk.fulfilled, (state, action) => {
    //   state.lyric = action.payload;
    // })
  }
})

export default playerSlice

export const {
  startSequencePlay,
  setCurrentIndex,
  deleteCurrentIndex,
  setOnReady,
  setShowPlayList,
  setPlayState,
  setCurrentPlayTimeOffset,
  playNext,
  playPrev,
  deleteAll,
  setFullScreen,
  setProgress,
  switchPlayMode,
  playAndInsertSong
} = playerSlice.actions

export const selectPlayerState = state => state.player
