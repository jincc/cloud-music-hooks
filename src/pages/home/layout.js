import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectPlayerState } from "../../store/api/playerSlice"
import style from '../../styles/global'
const Container = styled.div`
  position: fixed;
  top: 90px;
  width: 100%;
  bottom: ${props => props.$isPlaying ? '70px' : 0};
  background-color: #fff;
  overflow-y: auto;
  z-index: -1;
  ${style.hiddenScrollBar()}
`

const HomeLayout = ({children}) => {
  const { currentIndex } = useSelector(selectPlayerState);

  return <Container $isPlaying={currentIndex !== -1}>
    {children}
  </Container>
}

export default HomeLayout;