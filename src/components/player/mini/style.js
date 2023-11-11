import styled, {keyframes} from "styled-components";
import style from '../../../styles/global';
const coverAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  background-color: #fff;
  z-index: 1;
  border-top: 1px solid ${style["border-color"]};
  .cover {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    animation: ${coverAnimation} 6s linear infinite;
  }

  .paused-state {
    animation-play-state: ${props => props.$isPlaying ? 'running' : 'paused'};
  }

  .song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-self: stretch;
    padding: 6px 0px 6px 10px;
    .name {
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc"]};
    }

    .singer {
      font-size: ${style["font-size-s"]};
      color: ${style["font-color-desc-v2"]};
    }
  }
  .flex {
    flex: 1;
  }
  .play {
    font-size: 15px;
    color: ${style["theme-color"]};
  }

  //固定跟父容器一样大
  .play {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playlist {
    font-size: 28px;
    color: ${style["theme-color"]};
    margin-left: 15px;
  }


  /* &.move-enter, &.move-appear {
    bottom: -100%;
  }
  &.move-enter-active, &.move-appear-active {
    bottom: 0;
    transition: all 300ms ease-out;
  }
  &.move-exit {
    bottom: 0;
  }
  &.move-exit-active, &.move-exit-done {
    bottom: -100%;
    transition: all 300ms ease-out;
  } */
  &.move-appear {
    bottom: -60px;
  }
  &.move-appear-active{
    bottom: 0; 
    transition: all 200ms ease;
  }
  &.move-exit-active, &.move-exit-done {
    bottom: -60px;
    transition: all 200ms ease;
  }
`;