import styled from 'styled-components'
import style from '../../styles/global'
import { formatPlaytime } from '../../utils'
import { useRef } from 'react'
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 35px;
  color: ${style['font-color-desc']};
  font-size: ${style['font-size-s']};

  .progress-wrapper {
    margin: 0 3px;
    flex: 1;
    height: 3px;
    border-radius: 1px;
    background-color: ${style['background-color-shadow']};
    position: relative;
    .progress {
      width: 0;
      height: 100%;
      background-color: ${style['theme-color']};
      position: absolute;
      left: 0;
      top: 0;
    }

    .pot {
      background-color: ${style['theme-color']};
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: -7px;
      border: 3px solid #fff;
    }
  }
`
/**
 * 播放页线条进度条
 * @param {*} progress 播放进度
 * @param {*} totalTime 总时长
 * @returns
 */
const LineProgress = ({ progress = 0, totalTime, onPercentChanged }) => {
  const progressWrapperRef = useRef()
  const progressRef = useRef()
  const potRef = useRef()
  const touch = useRef({});
  progress = touch.current.initiated ? touch.current.progress : progress;
  const percent = progress * 100 + '%'
  const currentTime = Math.ceil(progress * totalTime)
  useEffect(() => {
    // calc(${props => props.$percent} - 15px)
    progressRef.current.style.width = percent;
    if (progressWrapperRef.current.clientWidth * (1 - progress) < 15) {
      potRef.current.style.left = `calc(${progressWrapperRef.current.clientWidth}px - 15px)`;
    } else {
      potRef.current.style.left = percent;
    }
  }, [percent, progress]);
  const handleClickProgress = e => {
    const rect = progressWrapperRef.current.getBoundingClientRect()
    const offset = e.pageX - rect.left
    const percent = offset / rect.width

    onPercentChanged && onPercentChanged(percent)
  }
  const onTouchStart = e => {
    touch.current.initiated = true;
    touch.current.startX = e.touches[0].pageX; //滑动开始时的横向坐标
    touch.current.startProgress = progress; //当前进度
    touch.current.progress = progress;
  }
  const onTouchMove = e => {
    if (!touch.current.initiated) return;

    const deltaX = e.touches[0].pageX - touch.current.startX;
    const barWidth = progressWrapperRef.current.clientWidth;
    const currentX = touch.current.startProgress * barWidth + deltaX;
    const percent = currentX / barWidth;
    touch.current.progress = percent;
    // console.log(percent);
  }
  const onTouchEnd = e => {
    touch.current.initiated = false;
    onPercentChanged && onPercentChanged(touch.current.progress);
  }
  return (
    <Container $percent={percent}>
      <span>{formatPlaytime(currentTime)}</span>
      <div
        className='progress-wrapper'
        ref={progressWrapperRef}
        onClick={handleClickProgress}
      >
        <div className='progress' ref={progressRef}></div>
        <div
          ref={potRef}
          className='pot'
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        ></div>
      </div>
      <span>{formatPlaytime(totalTime)}</span>
    </Container>
  )
}

export default LineProgress
