import { useDispatch, useSelector } from 'react-redux'
import { Container } from './style'
import { selectPlayerState, setPlayState } from '../../../store/api/playerSlice'
import Progressbar from '../../progressbar/circularbar'

const MiniPlayer = () => {
  const dispatch = useDispatch()
  const { currentIndex, playlist, isPlaying, progress } = useSelector(selectPlayerState)
  const song = playlist[currentIndex]
  const coverUrl = song.al.picUrl
  const name = song.name
  const singer = song.ar[0].name
  const playIcon = isPlaying ? '&#xe650;' : '&#xe61e;'

  //事件处理
  const handleClickPlay = () => {
    dispatch(setPlayState(!isPlaying))
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
      <span className='iconfont playlist'>&#xe640;</span>
    </Container>
  )
}

export default MiniPlayer
