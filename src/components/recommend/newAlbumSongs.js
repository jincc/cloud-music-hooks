import styled from 'styled-components'
import style from '../../styles/global'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tryPlayAndInsertSong } from '../../store/api/playerSlice'

const Container = styled.div`
  header {
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-l']};
    font-weight: 700;
    padding: 20px 10px;
    .arrow {
      font-size: 13px;
      padding-left: 4px;
    }
  }

  .content {
    .section {
      padding-left: 10px;
      width: 90vw;
    }
  }
`
const CellStyled = styled.div`
  padding: 5px 0px;
  display: flex;
  .img-wrapper {
    width: 7vh;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    overflow: hidden;
    flex: 1;
    .title {
      font-size: ${style['font-size-ll']};
      ${style.noWrap()}
    }

    .subTitle {
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc-v2']};
      ${style.noWrap()}
    }
  }
`

const Cell = ({ coverPicUrl, title, subTitle, onClick }) => {
  return (
    <CellStyled onClick={onClick}>
      <div className='img-wrapper'>
        <img width='100%' height='100%' src={coverPicUrl}></img>
      </div>
      <div className='content'>
        <p className='title'>{title}</p>
        <p className='subTitle'>{subTitle}</p>
      </div>
    </CellStyled>
  )
}

const NewAlbumSongs = ({ data }) => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const childs = data.map((e, index) => {
    const resources = e.resources
    return (
      <SwiperSlide key={index} className='section'>
        {resources.map(e => {
          const image = e.uiElement.image.imageUrl
          const title = e.uiElement.mainTitle.title
          let subTitle = e.uiElement.subTitle.title
          if (e.resourceExtInfo.artists.length > 0) {
            const artist = e.resourceExtInfo.artists[0].name;
            if (subTitle.length > 0) subTitle += ` - ${artist}`
            else subTitle = artist
          }
          return (
            <Cell
              key={e.resourceId}
              coverPicUrl={image}
              title={title}
              subTitle={subTitle}
              onClick={() => {
                console.log(e);
                const resourceId = e.resourceId;
                switch (e.resourceType) {
                  case "song":
                    dispath(tryPlayAndInsertSong(resourceId))
                    break;
                  case "album":
                    navigate(`/album/${resourceId}`)
                    break;
                  default:
                    break;
                }
              }}
            />
          )
        })}
      </SwiperSlide>
    )
  })
  return (
    <Container>
      <header>
        新歌新碟\数字专辑<span className='iconfont arrow'>&#xe618;</span>
      </header>
      <Swiper className='content' slidesPerView={'auto'}>{childs}</Swiper>
    </Container>
  )
}
export default NewAlbumSongs
