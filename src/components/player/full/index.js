import { useDispatch, useSelector } from "react-redux";
import { Container } from "./style";
import { selectPlayerState, setFullScreen } from "../../../store/api/playerSlice";
import Menu from "./menu";
import PlayList from "../playlist";
const FullPlayer = ({onPercentChanged}) => {
  const dispatch = useDispatch()
  const { currentIndex, playlist, isPlaying, progress, isShowPlayList } = useSelector(selectPlayerState)
  const song = playlist[currentIndex]


  // 事件
  const handleBack = () => {
    dispatch(setFullScreen(false))
  }

  return <Container $isPlaying={isPlaying}>
    {/* 背景区 */}
    <div className="background">
      <img src={song.al.picUrl + '?param=300x300'} alt="background" width='100%' height='100%' />
    </div>
    <div className="background layer"></div>
    <span className="iconfont back" onClick={handleBack}>&#xe662;</span>
    {/* 顶部歌曲信息 */}
    <div className="navbar">
      <span className="song-name">{song.name}</span>
      <span className="singer">{song.ar[0].name}</span>
    </div>
    {/* 封面区域 */}
    <div className="cover-info paused-state">
      <img src={song.al.picUrl + '?param=300x300'} alt="cover" width='100%' height='100%' />
    </div>
    {/* 底部菜单区域 */}
    <Menu song={song} onPercentChanged={onPercentChanged} />

    { isShowPlayList ? <PlayList /> : null}
  </Container>
}

export default FullPlayer;