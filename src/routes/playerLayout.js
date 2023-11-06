import styled from "styled-components"
import Player from "../pages/player";
import { useSelector } from "react-redux";
import { selectPlayerState } from "../store/api/playerSlice";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
`;
const PlayerLayout = (props) => {
  // const {currentIndex} = useSelector(selectPlayerState)
  return <Container>
    <div className="content">
      {props.children}
    </div>
    <Player />
  </Container>
}

export default PlayerLayout;