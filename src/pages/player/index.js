import { useDispatch, useSelector } from 'react-redux'
import MiniPlayer from '../../components/player/mini'
import { fetchLyric, playNext, selectPlayerState, setCurrentPlayTimeOffset, setOnReady, setPlayState, tryPlaySongThunk } from '../../store/api/playerSlice'
import { useEffect } from 'react'
import FullPlayer from '../../components/player/full'
import { useRef } from 'react'
import { useState } from 'react'
import { checkMp3, getMp3Url } from '../../utils'

/**
 * Mini-player功能点:
 *  1. 点击歌曲，底部展示模拟播放器
 *  2. 动画展示: 旋转、进度条
 *  3. 点击暂停、播放
 *  4. 点击播放列表
 *  5. 点击进入全屏播放器
 *
 * FullPlayer功能点:
 *  1. 点击左上角缩小，有转场动画
 *  2. 动画展示： 旋转、进度条
 *  3. 进度跟mini要同步
 *  4. 播放模式: 单曲循环、随机播放、顺序播放
 *  5. 交互上一首、下一首、暂停、播放列表
 *  6. 歌词
 *
 * 接口：
 *  - http://localhost:3300/lyric?id=2019573476
 *  - https://music.163.com/song/media/outer/url?id=108242.mp3
 * @returns
 */
const Player = () => {
  const audioRef = useRef()
  const dispatch = useDispatch()

  const { currentIndex, isFullScreen, playlist, isPlaying, isReady } =
    useSelector(selectPlayerState)

  useEffect(() => {
    if (currentIndex !== -1) {
      const fetchTask = async () => {
        const song = playlist[currentIndex];
        dispatch(tryPlaySongThunk(song.id));
      };
      fetchTask();
    }
  }, [currentIndex, dispatch, playlist])

  //是否开始播放
  useEffect(() => {
    if (!isReady) return;
    try {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      } 
    } catch (error) {
      console.log(error);
    }
  }, [isReady, isPlaying]);

  //如果currentIndex != -1代表有歌曲，开始展示底部信息
  if (currentIndex === -1) {
    return <></>
  }
  const song = playlist[currentIndex]
  const player = isFullScreen ? <FullPlayer /> : <MiniPlayer />
  //事件处理回调
  const handleError = e => {
    console.log(e)
    // dispatch(playNext());
  }
  const handleEnd = () => {
    dispatch(playNext());
  }
  const handleTimeUpdate = e => {
    //更新进度条
    dispatch(setCurrentPlayTimeOffset(e.target.currentTime));
  }
  return (
    <>
      {player}
      <audio
        ref={audioRef}
        src={getMp3Url(song.id)}
        onError={handleError}
        onEnded={handleEnd}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  )
}

export default Player
