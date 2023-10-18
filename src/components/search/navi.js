import styled from 'styled-components'
import style from '../../styles/global'
import { useNavigate } from 'react-router-dom'
import { debounce } from '../../utils'
import { useCallback } from 'react'

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-right: 25px;
  background: ${style['theme-color']};
  .back {
    color: #fff;
    font-size: 24px;
  }
  .input {
    border: none;
    outline: none;
    background: transparent;
    margin-left: 8px;
    border-bottom: 1px solid #fff;
    padding: 2px;
    color: #fff;
    flex: 1;
    font-size: ${style['font-size-m']};
  }
  .input::placeholder {
    color: #fff;
  }
`
const Navi = ({ onChange }) => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  };
  const _onChange = useCallback(
    debounce(e => {
      onChange(e)
    }, 500),
    [onChange]
  );

  return (
    <Container>
      <span className='iconfont back' onClick={handleBack}>
        &#xe655;
      </span>
      <input
        className='input'
        type='text'
        placeholder='搜索歌曲、歌手、专辑'
        onChange={_onChange}
      />
    </Container>
  )
}

export default Navi
