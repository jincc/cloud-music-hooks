import styled from 'styled-components'
import style from '../../styles/global'
import { useEffect, useRef } from 'react'

const Container = styled.div`
  position: relative;
  padding: 0 10px;
  ul {
    display: flex;
    overflow-x: auto;
    ${style.hiddenScrollBar()}
  }

  li {
    flex: 0 0 20%;
    padding: 10px 0 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img {
      width: 40px;
      aspect-ratio: 1;
    }
    span {
      padding-top: 5px;
      color: ${style['font-color-desc-v2']};
      font-size: ${style['font-size-m']};
    }
  }

  .progress-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 2px;
    width: 30px;
    border-radius: 1px;
    overflow: hidden;
    background-color: ${style['background-color-shadow']};

    .progress {
      position: absolute;
      width: 12px;
      height: 100%;
      background-color: ${style['theme-color']};
    }
  }
`

const DragonBall = ({ dragonBalls }) => {
  const scrollRef = useRef()
  const progressRef = useRef()

  const onScroll = (e) => {
    const offset = e.target.scrollLeft;
    //0.2是单个元素的宽度
    const maxOffset = scrollRef.current.clientWidth * 0.2 * dragonBalls.length - scrollRef.current.clientWidth; 
    const progress = Math.max(0, offset / maxOffset)
    const progressMaxOffset = 18; //30-12px
    if (progressRef.current) {
      progressRef.current.style.left = progress * progressMaxOffset + 'px'
    }
  }

  const childs = dragonBalls.map((e, index) => {
    return (
      <li key={index} className='item'>
        <img src={e.uiElement.image.imageUrl2} alt='dragon' />
        <span>{e.uiElement.mainTitle.title}</span>
      </li>
    )
  })
  return (
    <Container>
      <ul ref={scrollRef} onScroll={onScroll}>{childs}</ul>
      <div className='progress-wrapper'>
        <div className='progress' ref={progressRef}></div>
      </div>
    </Container>
  )
}
export default DragonBall
