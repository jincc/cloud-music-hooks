import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Backdrop from '../../backdrop'
import {
  selectPlayerState,
  setShowPlayList
} from '../../../store/api/playerSlice'
import Header from './header'
import SongCell from './songcell'

const Container = styled.div`
  height: 50vh;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow-y: auto;
`

const PlayList = () => {
  const dispatch = useDispatch()
  const {
    playlist = [],
    currentIndex,
    isShowPlayList
  } = useSelector(selectPlayerState)
  const childs = playlist.map((e, index) => {
    return (
      <SongCell
        data={e}
        key={e.id}
        index={index}
        isPlaying={currentIndex === index}
      />
    )
  })
  return (
    <Backdrop onExited={() => {
      dispatch(setShowPlayList(false))
    }}>
        <Container
          onClick={e => e.stopPropagation()}
          $isShowPlayList={isShowPlayList}
        >
          <Header />
          {childs}
        </Container>
    </Backdrop>
  )
}

export default PlayList
