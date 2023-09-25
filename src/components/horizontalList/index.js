import { useGetHotCategoryQuery } from '../../store/api/cloudApi'
import styled from 'styled-components'
import style from '../../styles/global'
import { useMemo } from 'react'

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
  .title {
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc-v2']};
  }
  .list {
    /* 横向并且不换行 */
    white-space: nowrap;
    /* 若要保证<ul>元素横向排列的项目不超出屏幕宽度，可以通过使用CSS中的overflow属性来实现 */
    overflow-x: auto;
    /* 隐藏IE和Edge浏览器的滚动条 */
    -ms-overflow-style: none;
    /* 隐藏Firefox浏览器的滚动条 */
    scrollbar-width: none;
    display: inline-block;
    flex: 1;
    padding-left: 5px;
    li {
      display: inline-block;
      font-size: ${style['font-size-m']};
      line-height: 1.5;
      color: ${style['font-color-desc']};
      margin-right: 10px;
    }
  }
  /* 隐藏Chrome和Safari浏览器的滚动条 */
  .list::-webkit-scrollbar {
    display: none;
  }
`
// title表示列表左侧的说明
// list表示为列表数据ß
export const HorizontalList = ({list=[], title, onClick}) => {
  const elements = list.map((e, index) => {
    const key = e.id || index
    return <li key={key} onClick={() => onClick && onClick(e)}>{e.name || e}</li>
  })
  
  return (
    <ContainerStyled>
      { title ? <span className='title'>{title}</span> : null}
      <ul className='list'>{elements}</ul>
    </ContainerStyled>
  )
}

export const HotCategory = ({onClick}) => {
  const { data } = useGetHotCategoryQuery()
  return <HorizontalList title={`分类(默认热门):`} list={data} onClick={onClick}/>
}


export const AlphaCategory = ({onClick}) => {
  const list = useMemo(() => {
    let items = [];
    for (const char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      items.push({id: char, name: char});
    }
    return items;
  }, []);
  return <HorizontalList title={`首字母:`} list={list} onClick={onClick}/>
}

