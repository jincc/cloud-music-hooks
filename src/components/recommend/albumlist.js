import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchAlbumList, selectRecommend } from "../../store/api/recommendSlice"
import style from '../../styles/global'
import Album from './album'
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  background-color: #fff;
  padding:0 0 20px 10px;
  border-bottom: 1px solid ${style["border-color"]};

  .header {
    height: 40px;
    line-height: 40px;
    font-size: ${style["font-size-l"]};
    font-weight: 700;

    .arrow {
      font-size: ${style["font-size-s"]};
      padding-left: 2px;
    }
  }
  .list {
    display: flex;
    overflow-x: auto;
    ${style.hiddenScrollBar()}
  }
`;

const AlbumList = ({albums}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (albums.length === 0) return <div></div>

  const albumsElems = albums.map((e, index) => {
    if (e.resources.length > 0) {
      const data = e.resources[0];
      return <Album album={data} key={data.resourceId} onClick={() => {
        navigate(`/playlist/${data.resourceId}`)
      }}/>
    }
    return null;
  })
  return <Container>
    <h2 className="header">推荐歌单<span className="iconfont arrow">&#xe618;</span></h2>
    <div className="list">
      {albumsElems}
    </div>
  </Container>
}

export default AlbumList;