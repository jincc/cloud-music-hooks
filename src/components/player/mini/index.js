import { useDispatch, useSelector } from 'react-redux'
import { Container } from './style'
import { selectPlayerState, setPlayState, setShowPlayList } from '../../../store/api/playerSlice'
import Progressbar from '../../progressbar/circularbar'
import PlayList from '../playlist'

const MiniPlayer = () => {
  const dispatch = useDispatch()
  const { currentIndex, playlist, isPlaying, progress, isShowPlayList } = useSelector(selectPlayerState)
  const song = playlist[currentIndex]
  const coverUrl = song.al.picUrl
  const name = song.name
  const singer = song.ar[0].name
  const playIcon = isPlaying ? '&#xe650;' : '&#xe61e;'

  //事件处理
  const handleClickPlay = () => {
    dispatch(setPlayState(!isPlaying))
  }
  const handleClickPlaylist = () => {
    dispatch(setShowPlayList(!isShowPlayList))
  }
  return (
    <Container $isPlaying={isPlaying}>
      <img className='cover paused-state' src={coverUrl} alt='cover' />
      <div className='song-info'>
        <span className='name'>{name}</span>
        <span className='singer'>{singer}</span>
      </div>
      <div className='flex' />
      <Progressbar radius={32} percent={progress}>
        <span
          className='iconfont play'
          onClick={handleClickPlay}
          dangerouslySetInnerHTML={{
            __html: playIcon
          }}
        />
      </Progressbar>
      <span className='iconfont playlist' onClick={handleClickPlaylist}>&#xe640;</span>
      { isShowPlayList ? <PlayList /> : null}
    </Container>
  )
}

export default MiniPlayer
