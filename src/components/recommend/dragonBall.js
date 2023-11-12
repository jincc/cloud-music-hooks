import { useSelector } from 'react-redux'
import styled from 'styled-components'
import style from '../../styles/global'
import Scroll from '../scroll'

const Container = styled.div`
  padding: 0 10px;
  ul {
    display: flex;
    overflow-x: auto;
    ${style.hiddenScrollBar()}
  }

  li {
    flex: 0 0 20%;
    padding:10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img {
      width: 40px;
      aspect-ratio: 1;
    }
    span {
      padding-top: 10px;
      color: ${style['font-color-desc-v2']};
      font-size: ${style['font-size-m']};
    }
  }
`

const DragonBall = ({ dragonBalls }) => {
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
      <ul>{childs}</ul>
    </Container>
  )
}
export default DragonBall
