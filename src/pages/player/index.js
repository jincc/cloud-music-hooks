import { useDispatch, useSelector } from 'react-redux'
import MiniPlayer from '../../components/player/mini'
import { checkSongMp3AddressState, fetchLyric, selectPlayerState, setCurrentPlayTimeOffset, setPlayState } from '../../store/api/playerSlice'
import { useEffect } from 'react'
import FullPlayer from '../../components/player/full'
import { useRef } from 'react'
import { useState } from 'react'

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

  const { currentIndex, isFullScreen, playlist, isPlaying } =
    useSelector(selectPlayerState)
  //开始监听，如果currentIndex != -1代表有歌曲，开始播放

  const hasSongToPlay = currentIndex !== -1
  useEffect(() => {
    if (currentIndex !== -1) {
      const fetchTask = async () => {
        const song = playlist[currentIndex];
        const lyric = await dispatch(fetchLyric(song.id)).unwrap();
        //获取歌曲成功，开始播放
        await dispatch(setPlayState(true));
      };
      fetchTask();
    }
  }, [currentIndex, dispatch])

  //是否开始播放
  useEffect(() => {
    if (currentIndex === -1 ) return;
    try {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      } 
    } catch (error) {
      console.log(error);
      error.preventDefault();
      debugger
    }
  }, [currentIndex, isPlaying]);

  if (!hasSongToPlay) {
    return <></>
  }
  const song = playlist[currentIndex]
  const player = isFullScreen ? <FullPlayer /> : <MiniPlayer />
  //事件处理回调
  const handleError = e => {
    console.log(e)
    // debugger
    e.preventDefault();
  }
  const handleEnd = () => {}
  const handleTimeUpdate = e => {
    //更新进度条
    dispatch(setCurrentPlayTimeOffset(e.target.currentTime));
  }
  return (
    <>
      {player}
      <audio
        ref={audioRef}
        src={`https://music.163.com/song/media/outer/url?id=${song.id}.mp3`}
        onError={handleError}
        onEnded={handleEnd}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  )
}

export default Player
