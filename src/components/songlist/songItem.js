import styled from 'styled-components'
import style from '../../styles/global'

//歌曲元素
const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  .index {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-l']};
    aspect-ratio: 1; //让宽度等于高度
  }
  .space {
    width: 15px;
  }
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  ${style.noWrap()}
  margin-right: 16px;
  .name {
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-l']};
    ${style.noWrap()}

  }
  .description {
    color: ${style['font-color-desc-v2']};
    font-size: ${style['font-size-ss']};
    ${style.noWrap()}
  }
  border-bottom: 1px solid ${style['border-color']};
`
// 传递index会展示左边的标号
const SongItem = ({ name, description, index, onClick }) => {
  return (
    <Container onClick={onClick}>
      {index ? (
        <div className='index'>{index}</div>
      ) : (
        <div className='space'></div>
      )}
      <Content>
        <p className='name'>{name}</p>
        <p className='description'>{description}</p>
      </Content>
    </Container>
  )
}

export default SongItem
