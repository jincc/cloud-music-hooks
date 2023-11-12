import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchAlbumList, selectRecommend } from "../../store/api/recommendSlice"
import style from '../../styles/global'
import Album from './album'
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  background-color: #fff;
  .header {
    height: 40px;
    line-height: 40px;
    font-size: ${style["font-size-l"]};
    font-weight: 700;
    padding-left: 5px;
  }
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
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
        navigate(`/album/${data.resourceId}`)
      }}/>
    }
    return null;
  })
  return <Container>
    <h2 className="header">推荐歌单</h2>
    <div className="list">
      {albumsElems}
    </div>
  </Container>
}

export default AlbumList;