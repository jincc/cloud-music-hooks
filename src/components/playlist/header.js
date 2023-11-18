import styled from 'styled-components'
import style from '../../styles/global'
import { formatPlayCount } from '../../utils'

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
    background: url(${props => props.$coverImgUrl}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
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
    align-items: center;
    padding: 60px 20px 20px 20px;
    position: absolute;
    .cover {
      display: flex;
      justify-content: flex-end;
      width: 120px;
      aspect-ratio: 1;
      background: url(${props => props.$coverImgUrl}) no-repeat;
      background-position: 0 0;
      background-size: 100% 100%;
      color: ${style['font-color-light']};
      .num {
        font-size: ${style['font-size-s']};
        padding: 2px 2px 0px 3px;
      }
      .icon {
        font-size: 16px;
      }
    }

    .cover-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 120px;
      padding-left: 10px;
      .cover-name {
        color: ${style['font-color-light']};
        font-size: 700;
      }

      .cover-author {
        display: flex;
        align-items: center;
        color: ${style['font-color-light']};
        font-size: ${style['font-size-s']};
        img {
          width: 20px;
          border-radius: 50%;
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

const AlbumHeader = ({ album }) => {
  return (
    <Container $coverImgUrl={album.coverImgUrl}>
      <div className='background'>
        <div className='filter' />
      </div>
      <div className='cover-wrapper'>
        <div className='cover'>
          <span className='iconfont icon'>&#xe885;</span>
          <span className='num'>{formatPlayCount(album.playCount)}</span>
        </div>
        <div className='cover-info'>
          <div className='cover-name'>{album.name}</div>
          <div className='cover-author'>
            <img src={album.creator.avatarUrl} alt='creator' />
            <span>{album.creator.nickname}</span>
          </div>
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
        <div className='item'>
          <span className='iconfont icon'>&#xe606;</span>
          <span className='name'>更多</span>
        </div>
      </div>
      <div className='play-wapper'>
        <div className='play'>
          <span className='iconfont icon'>&#xe6e3;</span>
          <span className='play-all'>播放全部</span>
          <span className='total-songs'>（共 {album.tracks.length}首）</span>
        </div>
        <div className='fav'>
          <span className='iconfont icon'>&#xe62d;</span>
          <span>收藏（{formatPlayCount(album.subscribedCount)}）</span>
        </div>
      </div>
    </Container>
  )
}

export default AlbumHeader
