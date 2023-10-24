// 搜索结果页
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import style from '../../styles/global'
import {
  fetchSuggestByKeyword,
  selectSearchState
} from '../../store/api/searchSlice'
import AlbumItem from '../songlist/ablumItem'
import SongItem from '../songlist/songItem'
import { debounce } from '../../utils'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  .sectionName {
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-s']};
    padding: 10px 10px;
  }
  .album {
    padding: 0px 0px 5px 5px;
    border-bottom: 1px solid ${style['border-color']};
    margin-bottom: 10px;
  }
  .song {
    height: 50px;
    padding-left: 10px;
  }
`

const SearchContent = ({ keyword }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    searchResults: { artists=[], playlists=[], songs=[] }
  } = useSelector(selectSearchState)
  // console.log(searchResults, keyword);

  useEffect(() => {
    if (keyword && keyword.length) dispatch(fetchSuggestByKeyword(keyword))
  }, [keyword])

  const createSingerList = useCallback(artists => {
    if (artists.length === 0) return null

    const childs = artists.map((e, index) => {
      return (
        <div className='album' key={index}>
          <AlbumItem
            picUrl={e.picUrl + '?params=300*300'}
            name={`歌单: ${e.name}`}
            onClick={() => navigate(`/singer/${e.id}`)}
          />
        </div>
      )
    })
    return (
      <div>
        <p className='sectionName'>相关歌手</p>
        {childs}
      </div>
    )
  }, [])

  const createAlbumsList = useCallback(playlists => {
    if (playlists.length === 0) return null

    const childs = playlists.map((e, index) => {
      return (
        <div className='album' key={index}>
          <AlbumItem
            picUrl={e.coverImgUrl + '?params=300*300'}
            name={`歌单: ${e.name}`}
            onClick={() => navigate(`/album/${e.id}`)}
          />
        </div>
      )
    })
    return (
      <div>
        <p className='sectionName'>相关歌单</p>
        {childs}
      </div>
    )
  }, [])

  const createSongsList = useCallback(songs => {
    if (songs.length === 0) return null

    const childs = songs.map((e, index) => {
      const description = `${e.artists[0].name} - ${e.album.name}`
      return <SongItem name={e.name} description={description} key={index}/>
    })
    return (
      <div>
        {childs}
      </div>
    )
  }, [])

  return (
    <Container>
      {createSingerList(artists)}
      {createAlbumsList(playlists)}
      {createSongsList(songs)}
    </Container>
  )
}

export default SearchContent
