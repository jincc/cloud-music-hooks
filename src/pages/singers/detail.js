import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSingerDetail,
  selectSingerDetailState
} from '../../store/api/singerDetailSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Spinner from '../../components/spinner'
import SongItem from '../../components/songlist/songItem'
import BackHeader from '../../components/navbar/fixed-navbar'
import style from '../../styles/global';

const Container = styled.div`
  header {
    height: 300px;
    background: url(${props => props.$artistUrl});
    background-size: 100% 100%;
    background-position: 0 0;
    position: relative;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, 0.3);
    }
  }

  .play-wapper {
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    color: ${style['font-color-desc']};
    border-bottom: 1px solid ${style['border-color']};
    .icon {
      font-size: 20px;
    }
    .play-all {
      padding-left: 10px;
      font-size: ${style['font-size-l']};
    }
    .total-songs {
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc-v2']}
    }
  }
`;

// 歌手详情页面
const SingerDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { detail, loadding } = useSelector(selectSingerDetailState)
  useEffect(() => {
    dispatch(fetchSingerDetail(id))
  }, [id])

  if (loadding) {
    return <Spinner />
  }

  const { artist, hotSongs } = detail

  const songs = hotSongs.map((e, index) => {
    const desc = `${e.ar[0].name} - ${e.al.name}`
    return <SongItem name={e.name} description={desc} index={index + 1} />
  })

  return (
    <Container $artistUrl={artist.picUrl}>
      <BackHeader title={artist.name} />
      <header>
        <div className='filter' />
      </header>
      <div>
        <div className='play-wapper'>
          <span className='iconfont icon'>&#xe6e3;</span>
          <span className='play-all'>播放全部</span>
          <span className='total-songs'>（共 {hotSongs.length}首）</span>
        </div>
        {songs}
      </div>
    </Container>
  )
}

export default SingerDetail
