import ReactDOM from 'react-dom'
import styled from 'styled-components'
import style from '../../styles/global'
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'
const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${style['background-color-shadow']};

  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    &.move-enter,
    &.move-appear {
      bottom: -100%;
    }
    &.move-enter-active,
    &.move-appear-active {
      bottom: 0;
      transition: bottom 300ms ease-out;
    }
    &.move-exit {
      bottom: 0;
    }
    &.move-exit-active {
      bottom: -100%;
      transition: bottom 300ms ease-out;
    }
  }

  &.fade-enter,
  &.fade-appear {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-appear-active {
    opacity: 1;
    transition: opacity 300ms ease-out;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
`
const backdropRoot = document.getElementById('backdrop')
/**
 * 该组件会有一个从底到上的弹出动画
 * @param {*} props.onExited 退出时的回调
 * @returns 
 */
const Backdrop = props => {
  const [show, setShow] = useState(true)
  const onClick = () => {
    setShow(false)
  }
  const onExited = () => {
    props.onExited && props.onExited()
  }
  return ReactDOM.createPortal(
    <CSSTransition
      appear
      in={show}
      classNames='fade'
      timeout={300}
      onExited={onExited}
    >
      <Container {...props} onClick={onClick}>
        <CSSTransition appear in={show} classNames='move' timeout={300}>
          <div className='content'>{props.children}</div>
        </CSSTransition>
      </Container>
    </CSSTransition>,
    backdropRoot
  )
}

export default Backdrop
