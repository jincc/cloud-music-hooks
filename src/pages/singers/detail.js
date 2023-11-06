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
import style from '../../styles/global'
import Scroll from '../../components/scroll'
import { useRef } from 'react'
import { startSequencePlay } from '../../store/api/playerSlice'
const HEADER_HEIGHT = 40

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: 0;
    padding-top: 75%;
    background: url(${props => props.$artistUrl});
    background-size: cover;
    background-position: 0 0;
    transform-origin: top;
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

  .scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .play-wapper {
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    color: ${style['font-color-desc']};
    border-bottom: 1px solid ${style['border-color']};
    overflow: hidden;
    .icon {
      font-size: 20px;
    }
    .play-all {
      padding-left: 10px;
      font-size: ${style['font-size-l']};
    }
    .total-songs {
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc-v2']};
    }
  }

  .song-list-wrapper {
    background-color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    min-height: calc(100% + 1px);
  }
`

// 歌手详情页面
const SingerDetail = () => {
  const scrollData = useRef({
    imageHeight: 0
  })
  const imageRef = useRef()
  const scrollWrapperRef = useRef()
  const scrollRef = useRef()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { detail, loadding } = useSelector(selectSingerDetailState)
  useEffect(() => {
    dispatch(fetchSingerDetail(id))
  }, [id])
  //获取图片原始高度
  useEffect(() => {
    //说明数据已经拉取完成
    if (detail) {
      scrollData.current.imageHeight = imageRef.current.offsetHeight;
      scrollWrapperRef.current.style.top = `${imageRef.current.offsetHeight - 10}px`;
      scrollRef.current.refresh();
      console.log(imageRef.current.offsetHeight);
    }
  }, [detail])

  if (loadding) {
    return <Spinner />
  }
  const onScroll = pos => {
    const y = pos.y
    const imageHeight = scrollData.current.imageHeight
    const minScrollY = -imageHeight + HEADER_HEIGHT
    const percent = Math.abs(y / imageHeight)
    console.log(percent);
    if (y > 0) {
      //图片放大
      imageRef.current.style['transform'] = `scale(${1 + percent})`
      scrollWrapperRef.current.style.top = `${imageHeight}px`;
    } else if (y >= minScrollY) {
      imageRef.current.style.paddingTop = '75%'
      imageRef.current.style.height = 0
      // 列表在上，背景图在下
      imageRef.current.style.zIndex = 0;
      scrollWrapperRef.current.style.zIndex = 1;
      scrollWrapperRef.current.style.top = `${imageHeight}px`;
    } else if (y < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      imageRef.current.style.height = `${HEADER_HEIGHT}px`;
      imageRef.current.style.paddingTop = '0px';
      // 背景图展示在上，防止被列表遮住
      imageRef.current.style.zIndex = 1;
      scrollWrapperRef.current.style.zIndex = 0;
      scrollWrapperRef.current.style.top = `0`;
    }
  }

  const handleClickSong = (songs, index) => {
    dispatch(startSequencePlay({
      playlist: songs,
      index: index
    }));
  }

  const { artist, hotSongs } = detail

  const songs = hotSongs.map((e, index) => {
    const desc = `${e.ar[0].name} - ${e.al.name}`
    return (
      <SongItem
        key={index}
        name={e.name}
        description={desc}
        index={index + 1}
        onClick={() => handleClickSong(hotSongs, index)}
      />
    )
  })

  return (
    <Container $artistUrl={artist.picUrl}>
      <BackHeader title={artist.name} />
      <header ref={imageRef}>
        <div className='filter' />
      </header>
      <div className='scroll-wrapper' ref={scrollWrapperRef}>
        <Scroll onScroll={onScroll} ref={scrollRef}>
          <div className='song-list-wrapper'>
            <div className='play-wapper'>
              <span className='iconfont icon'>&#xe6e3;</span>
              <span className='play-all'>播放全部</span>
              <span className='total-songs'>（共 {hotSongs.length}首）</span>
            </div>
            {songs}
          </div>
        </Scroll>
      </div>
    </Container>
  )
}

export default SingerDetail
