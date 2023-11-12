import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBanners, selectRecommend } from '../../store/api/recommendSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import styled from 'styled-components'
import style from '../../styles/global'

const Container = styled.div`
  background: white;
  position: relative;
  .before {
    background-color: ${props => props.$loadding ? 'transparent' : style['theme-color']};
    height: 100px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
  }
  .swiper-container {
    width: 98%;
    margin: auto;
    .swiper-pagination-bullet-active {
      background: ${style['theme-color']};
    }
  }

  .slider {
    border-radius: 6px;
    overflow: hidden;
  }
`

const Banner = ({banners}) => {
  const slides = banners.map((e, index) => {
    return (
      <SwiperSlide key={e.bannerId + index}>
        <div className='slider'>
          <img src={e.pic} alt='banner' width='100%' height='100%' />
        </div>
      </SwiperSlide>
    )
  })

  return (
    <Container>
      <div className='before'/>
      <div className='swiper-container'>
        <Swiper modules={[Pagination]} pagination>
          {slides}
        </Swiper>
      </div>
    </Container>
  )
}

export default Banner;
