import { useDispatch, useSelector } from 'react-redux'
import AlbumHeader from '../../components/album/header'
import { useEffect, useRef, useState } from 'react'
import {
  fetchAlbumSongsList,
  selectAlbumState
} from '../../store/api/albumSlice'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner'
import BackHeader from '../../components/navbar/fixed-navbar'
import SongItem from '../../components/songlist/songItem'
import Scroll from '../../components/scroll'
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AlbumList = () => {
  const backHeaderRef = useRef();
  const { id } = useParams()
  const dispatch = useDispatch()
  const { playlist, loadding } = useSelector(selectAlbumState)
  useEffect(() => {
    dispatch(fetchAlbumSongsList(id))
  }, [])
  if (loadding) {
    return <Spinner />
  }

  const onScroll = (e) => {
    let opacity = 0;
    if (e.y <= -44) {
      //隐藏
      opacity = 0;
    } else if (e.y > -44 && e.y < 0){
      opacity = 1 - Math.abs(e.y) / 44;
    } else {
      opacity = 1;
    }
    backHeaderRef.current.setOpacity(opacity);
  }

  const songs = (playlist.tracks || []).map((e, index) => {
    const desc = `${e.ar[0].name} - ${e.al.name}`
    return (
      <SongItem key={e.id} name={e.name} description={desc} index={index + 1}></SongItem>
    )
  })

  return (
    <Container>
      <BackHeader ref={backHeaderRef} title={playlist.name}/>
      <Scroll onScroll={onScroll}>
        <div>
          <AlbumHeader album={playlist} />
          {songs}
        </div>
      </Scroll>
    </Container>
  )
}

export default AlbumList