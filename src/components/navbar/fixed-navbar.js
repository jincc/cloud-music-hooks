import styled from 'styled-components'
import style from '../../styles/global'
import { useNavigate } from 'react-router-dom'
import { forwardRef, useImperativeHandle, useRef } from 'react'
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  color: #fff;
  z-index: 1;
  .icon {
    padding-left: 10px;
    font-size: 20px;
  }
  .title {
    padding-left: 5px;
    font-size: ${style['font-size-l']};
  }
`
const Navbar = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const _ref = useRef();
  const handleBack = () => {
    navigate(-1)
  }
  //给外界暴露方法
  useImperativeHandle(ref, () => {
    return {
      setOpacity(opacity) {
        _ref.current.style.opacity = opacity;
      }
    }
  });

  return (
    <Container ref={_ref}>
      <span className='iconfont icon' onClick={handleBack}>
        &#xe655;
      </span>
      <span className='title'>{props.title}</span>
    </Container>
  )
})

export default Navbar
