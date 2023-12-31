import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectPlayerState } from "../../store/api/playerSlice"
import style from '../../styles/global'
const Container = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  bottom: ${props => props.$isPlaying ? '70px' : 0};
  overflow: auto;
  z-index: -1;
  ${style.hiddenScrollBar()}
`

const PlayerLayout = ({children}) => {
  const { currentIndex } = useSelector(selectPlayerState);

  return <Container $isPlaying={currentIndex !== -1}>
    {children}
  </Container>
}

export default PlayerLayout;