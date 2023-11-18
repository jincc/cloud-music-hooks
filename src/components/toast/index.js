import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import style from '../../styles/global'
import { useState } from 'react'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'


const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: -100%;
  opacity: 0;
  background-color: ${style['theme-color-shadow']};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$textColor || style['font-color-light']};
  font-size: ${style['font-size-m']};

  z-index: 1000;
  span {
    padding: 20px;
  }
  &.move-enter-active,
  &.move-enter-done {
    bottom: 0;
    opacity: 1;
  }
  &.move-exit-active,
  &.move-exit-done {
    bottom: -100%;
    opacity: 0;
  }
  &.move-enter-active,
  &.move-exit-active {
    transition: all 300ms ease-in;
  }
`
const Toast = forwardRef(({ textColor }, ref) => {
  const [show, setShow] = useState(false)
  const spanRef = useRef()
  //给外界暴露方法
  useImperativeHandle(ref, () => {
    return {
      show (msg) {
        spanRef.current.textContent = msg
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 3000)
      }
    }
  })
  return ReactDOM.createPortal(
    <CSSTransition in={show} timeout={300} classNames='move'>
      <Container $textColor={textColor}>
        <span ref={spanRef} />
      </Container>
    </CSSTransition>,
    document.getElementById('backdrop')
  )
})

export default Toast
