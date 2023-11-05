import styled from "styled-components";
import style from '../../../styles/global';
import { useDispatch } from "react-redux";
import { deleteCurrentIndex, setCurrentIndex } from "../../../store/api/playerSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  /* height: 40px; */
  padding: 10px 16px;
  padding-left: 0;
  margin-left: 16px;
  border-bottom: 0.5px solid ${style["border-color"]};
  .play {
    color: ${style["theme-color"]};
    font-size: 12px;
  }
  .name {
    padding-left: 10px;
    font-size: ${style["font-size-m"]};
    color: ${props => props.$isPlaying ? style["theme-color"] : style["font-color-desc-v2"]};
  }
  .flex {
    flex: 1;
  }
  .trash {
    color: ${style["theme-color"]};
    font-size: 16px;
  }
`;
const SongCell = ({isPlaying, data, index}) => {
  const dispatch = useDispatch()
  const name = `${data.name} - ${data.ar[0].name}`;
  const handleClickPlay = () => {
    dispatch(setCurrentIndex(index));
  }
  const handleTrash = (e) => {
    e.stopPropagation();
    dispatch(deleteCurrentIndex(index));

  }

  return <Container onClick={handleClickPlay} $isPlaying={isPlaying}>
    {isPlaying && <span className="iconfont play">&#xe731;</span>}
    <span className="name">{name}</span>
    <span className="flex"></span>
    <span className="iconfont trash" onClick={handleTrash}>&#xe63d;</span>
  </Container>
}

export default SongCell;