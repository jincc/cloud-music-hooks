import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'
import style from '../../styles/global'
import { useState } from 'react'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useRef } from 'react'
const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${style['font-color-light']};
  font-size: ${style['font-size-m']};

  z-index: 1000;

  &.move-enter {
    bottom: -20px;
  }
  &.move-enter-active{
    bottom: 20px;
    transition: all 300ms ease-in;
  }
  &.move-exit-active, &.move-exit-done {
    bottom: -20px;
    transition: all 300ms ease-in;
  }
`
const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const spanRef = useRef()
    //给外界暴露方法
  useImperativeHandle(ref, () => {
    return {
      show(msg) {
        spanRef.current.textContent = msg
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 3000)
      }
    } 
  });
  return (
    <CSSTransition in={show} timeout={300} classNames='move'>
      <Container>
        <span ref={spanRef} />
      </Container>
    </CSSTransition>
  )
});

export default Toast
