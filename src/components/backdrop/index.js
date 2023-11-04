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
`
const backdropRoot = document.getElementById('backdrop')

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <Container {...props}>{props.children}</Container>,
    backdropRoot
  )
}

export default Backdrop
