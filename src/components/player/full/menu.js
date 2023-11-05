import styled from "styled-components";
import style from '../../../styles/global';
import { useDispatch, useSelector } from "react-redux";
import { playNext, playPrev, selectPlayerState, setPlayState, setProgress, setShowPlayList } from "../../../store/api/playerSlice";
import LineProgress from "../../progressbar/lineprogress";
const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;

  .btns {
    margin-top: 20px;
    padding: 0 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconfont {
      color: ${style["font-color-desc"]};
      font-size: 30px;

      &.center {
        font-size: 40px;
      }
    }
  }
`;

const Menu = ({song, onPercentChanged}) => {
  const dispatch = useDispatch();
  const {isPlaying, progress} = useSelector(selectPlayerState);
  const handleNext = () => {
    dispatch(playNext());
  }

  const handlePrev = () => {
    dispatch(playPrev())
  }

  const handlePlay = () => {
    dispatch(setPlayState(!isPlaying))
  }

  const handleShowPlayList = () => {
    dispatch(setShowPlayList(true))
  }

  return <Container>
    <LineProgress totalTime={song.dt} progress={progress} onPercentChanged={onPercentChanged}/>
    <div className="btns">
      <span className="iconfont">&#xe625;</span>
      <span className="iconfont" onClick={handlePrev}>&#xe6e1;</span>
      <span className="iconfont center" onClick={handlePlay} dangerouslySetInnerHTML={{
        __html: isPlaying ? '&#xe723;' : '&#xe731;'
      }} />
      <span className="iconfont" onClick={handleNext}>&#xe718;</span>
      <span className="iconfont" onClick={handleShowPlayList}>&#xe640;</span>
    </div>
  </Container>
}

export default Menu;