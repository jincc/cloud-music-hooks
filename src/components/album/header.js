import styled from 'styled-components'
import style from '../../styles/global'
import { formatDateToYYYYMMDD } from '../../utils'

const Container = styled.div`
  position: relative;
  height: 305px;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 65px;
    right: 0;
    //设置背景图
    background: url(${props => props.$blurPicUrl}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 65px;
    left: 0;
    width: 100%;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      .name {
        font-size: ${style['font-size-s']};
        line-height: 1.5;
      }
      .icon {
        font-size: 20px;
      }
    }
  }
  .cover-wrapper {
    display: flex;
    padding: 60px 20px 20px 20px;
    .cover {
      width: 120px;
      aspect-ratio: 1;
      background: url(${props => props.$coverImgUrl}) no-repeat;
      background-position: 0 0;
      background-size: 100% 100%;
      color: ${style['font-color-light']};
      border-radius: 15px;
    }

    .cover-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 120px;
      padding-left: 10px;
      flex: 1;
      overflow: hidden;
      .cover-name {
        padding-top: 10px;
        color: ${style['font-color-light']};
        font-size: ${style['font-size-l']};
      }

      .cover-author {
        display: flex;
        align-items: center;
        padding-top: 7px;
        color: lightgray;
        font-size: ${style['font-size-m']};
        
        .artist {
          padding-left: 10px;
          color: ${style['font-color-light']};
        }

        .arrow {
          font-size: 15px;
          color: ${style['font-color-light']};
        }

      }
      .flex {
        flex: 1;
      }
      .cover-publishTime {
        color: lightgray;
        font-size: ${style['font-size-m']};
      }
      .cover-description-wrapper {
        justify-content: space-between;
        padding-top: 8px;
        color: lightgray;
        font-size: ${style['font-size-m']};
        overflow: hidden;
        display: flex;
        align-items: center;
        .description {
          ${style.noWrap()}
        }
        .arrow {
          color: ${style['font-color-light']};
        }
      }
    }
  }

  .play-wapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 65px;
    left: 0;
    width: 100%;

    .play {
      display: flex;
      align-items: center;
      font-size: ${style['font-size-l']};
      color: ${style['font-color-desc']};
      .icon {
        font-size: 20px;
        padding-left: 15px;
        color: #000;
      }
      .total-songs {
        color: ${style['font-color-desc-v2']};
        font-size: ${style['font-size-s']};
        align-self: flex-end;
      }
      .play-all {
        padding-left: 8px;
      }
    }

    .fav {
      color: #fff;
      font-size: ${style['font-size-m']};
      padding: 10px;
      background-color: ${style['theme-color']};
      .icon {
        color: ${style['font-color-desc-v2']};
        padding-right: 3px;
      }
    }
  }
`

const AlbumHeader = ({ album, totalSong }) => {
  const publishTime = formatDateToYYYYMMDD(new Date(album.publishTime))
  return (
    <Container $coverImgUrl={album.picUrl} $blurPicUrl={album.blurPicUrl}>
      <div className='background'>
        <div className='filter' />
      </div>
      <div className='cover-wrapper'>
        <div className='cover'>
        </div>
        <div className='cover-info'>
          <p className='cover-name'>{album.name}</p>
          <p className='cover-author'>
            歌手:<span className='artist'>{album.artist.name}</span><span className='iconfont arrow'>&#xe618;</span>
          </p>
          <div className='flex'></div>
          <p className='cover-publishTime'>发行时间: {publishTime}</p>
          <p className='cover-description-wrapper'>
            <span className='description'>{album.description}</span>
            <span className='iconfont arrow'>&#xe618;</span>
            </p>
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <span className='iconfont icon'>&#xe6ad;</span>
          <span className='name'>评论</span>
        </div>
        <div className='item'>
          <span className='iconfont icon'>&#xe6fc;</span>
          <span className='name'>点赞</span>
        </div>
        <div className='item'>
          <span className='iconfont icon'>&#xe62d;</span>
          <span className='name'>收藏</span>
        </div>
      </div>
      <div className='play-wapper'>
        <div className='play'>
          <span className='iconfont icon'>&#xe6e3;</span>
          <span className='play-all'>播放全部</span>
          <span className='total-songs'>（共 {totalSong}首）</span>
        </div>
      </div>
    </Container>
  )
}

export default AlbumHeader
