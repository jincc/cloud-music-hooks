import { useDispatch, useSelector } from 'react-redux'
import AlbumHeader from '../../components/album/header'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner'
import BackHeader from '../../components/navbar/fixed-navbar'
import SongItem from '../../components/songlist/songItem'
import Scroll from '../../components/scroll'
import { startSequencePlay } from '../../store/api/playerSlice'
import PlayerLayout from '../player/layout'
import { fetchAlbumDetail, selectAlbumDetailState } from '../../store/api/albumSlice'
import { formatSongArtistName } from '../../utils'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .content {
    //低于屏幕高度时，使其能够滚动
    min-height: calc(100vh + 1px);
  }
`

const AlbumDetail = () => {
  const backHeaderRef = useRef()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { songs, album, loadding } = useSelector(selectAlbumDetailState)
  useEffect(() => {
    dispatch(fetchAlbumDetail(id))
  }, [])

  if (loadding || !album || !songs.length) {
    return <Spinner />
  }

  const onScroll = e => {
    let opacity = 0
    if (e.y <= -44) {
      //隐藏
      opacity = 0
    } else if (e.y > -44 && e.y < 0) {
      opacity = 1 - Math.abs(e.y) / 44
    } else {
      opacity = 1
    }
    backHeaderRef.current.setOpacity(opacity)
  }

  const handleClickSong = (songs, index) => {
    dispatch(
      startSequencePlay({
        playlist: songs,
        index: index
      })
    )
  }

  const songEles = (songs || []).map((e, index) => {
    const desc = `${formatSongArtistName(e)}`
    return (
      <SongItem
        key={e.id}
        name={e.name}
        description={desc}
        index={index + 1}
        onClick={() => handleClickSong(songs, index)}
      ></SongItem>
    )
  })

  return (
    <PlayerLayout>
      <Container>
        <BackHeader ref={backHeaderRef} title={album.name} />
        <Scroll onScroll={onScroll}>
          <div className='content'>
            <AlbumHeader album={album} totalSong={songEles.length}/>
            {songEles}
          </div>
        </Scroll>
      </Container>
    </PlayerLayout>
  )
}

export default AlbumDetail
