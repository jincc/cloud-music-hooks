import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchAlbumList, selectRecommend } from "../../store/api/recommendSlice"
import style from '../../styles/global'
import Album from './album'

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

const AlbumList = () => {
  const dispatch = useDispatch();
  const {albums=[]} = useSelector(selectRecommend);
  console.log(albums);
  useEffect(() => {
    dispatch(fetchAlbumList());
  }, []);

  if (albums.length === 0) return <div></div>

  const albumsElems = albums.map(e => {
    return <Album album={e} key={e.id} />
  })
  return <Container>
    <h2 className="header">推荐歌单</h2>
    <div className="list">
      {albumsElems}
    </div>
  </Container>
}

export default AlbumList;