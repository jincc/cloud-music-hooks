import styled, { keyframes } from 'styled-components'
import style from '../../../styles/global'

const coverAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: ${style['background-color']};
  .background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    filter: blur(20px);

    &.layer {
      background: ${style['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
  .navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    color: ${style['font-color-desc']};
    .song-name {
      color: ${style['font-color-desc']};
      font-size: ${style['font-size-ll']};
      ${style.noWrap()}
      text-align: center;
      max-width: 70vw;
    }
    .singer {
      margin-top: 10px;
      color: ${style['font-color-desc']};
      font-size: ${style['font-size-m']};
    }
  }

  .back {
    position: absolute;
    top: 10px;
    left: 16px;
    font-size: 25px;
    font-weight: 700;
    transform: rotate(90deg);
  }

  .cover-info {
    /* 定位居中 */
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75vw;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    border: 8px solid ${style['font-color-desc-v2']};
    animation: ${coverAnimation} 6s linear infinite;

    &.paused-state {
      animation-play-state: ${props =>
        props.$isPlaying ? 'running' : 'paused'};
    }
  }

  &.move-enter, &.move-appear {
    bottom: -100vh;
    opacity: 0;
  }
  &.move-enter-active, &.move-appear-active{
    bottom: 0;
    opacity: 1;
    transition: all 300ms ease-out;
  }
  &.move-exit-active, &.move-exit-done {
    /* bottom: -100vh; */
    opacity: 0;
    transition: all 300ms ease-out;
  }

`