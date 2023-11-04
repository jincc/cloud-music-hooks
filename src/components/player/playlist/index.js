import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import Backdrop from '../../backdrop'
import {
  selectPlayerState,
  setShowPlayList
} from '../../../store/api/playerSlice'
import Header from './header'
import SongCell from './songcell'
import { useState } from 'react'

const moveUpAnimation = keyframes`
  from {
    bottom: -50vh;
  }
  to {
    bottom: 0;
  }
`;

const moveDownAnimation = keyframes`
  from {
    bottom: 0;
  }
  to {
    bottom: -50vh;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50vh;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow-y: auto;
  &.fade-enter-active,
  &.fade-appear-active {
    animation: ${moveUpAnimation} 300ms ease-out;
  }
  &.fade-exit-active {
    animation: ${moveDownAnimation} 300ms ease-out;
  }
`

const PlayList = () => {
  const [isShow, setShow] = useState(true)
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
    <Backdrop onClick={() => {
      setShow(false)
    }}>
      <CSSTransition in={isShow} timeout={300} classNames='fade' appear onExited={() => dispatch(setShowPlayList(false)) }>
        <Container
          onClick={e => e.stopPropagation()}
          $isShowPlayList={isShowPlayList}
        >
          <Header />
          {childs}
        </Container>
      </CSSTransition>
    </Backdrop>
  )
}

export default PlayList
