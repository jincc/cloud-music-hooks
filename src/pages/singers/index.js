import { HotCategory, AlphaCategory } from '../../components/horizontalList'
import styled from 'styled-components'
import style from '../../styles/global'
import {
  useGetSingersByCategoryQuery,
  useGetHotSingersQuery
} from '../../store/api/cloudApi'
import { useEffect, useState } from 'react'
import Scroll from '../../components/scroll'
const ContainerWrapper = styled.div`
  .menu {
    margin-top: 5px;
  }
`

const ListContainer = styled.div`
  padding-top: 10px;
  position: fixed;
  top: 150px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
`

const ListItemStyled = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 3px;
  border-bottom: 1px solid ${style['border-color']};
  img {
    width: 13vw;
    height: 13vw;
    border-radius: 3px;
  }
  .singerName {
    padding-left: 15px;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']};
  }
`

const ListItem = ({ avatarUrl, singerName }) => {
  return (
    <ListItemStyled>
      <img src={avatarUrl} alt='singer' />
      <span className='singerName'>{singerName}</span>
    </ListItemStyled>
  )
}
const Singers = () => {
  //查询所用的参数，交互会重新修改这些参数触发重新加载
  const [query, setQuery] = useState({
    category: null,
    alpha: null
  })
  //loading状态机
  const [loading, setLoading] = useState({
    pullDown: false,
    pullUp: false
  })

  //用于上拉和下拉的偏移量
  const [offset, setOffset] = useState(0)
  // 是否用户选中了分类信息
  const isFetchByCategory = query.category != null || query.alpha != null
  // 查询热门歌手数据
  const { data: hotSingers = [] } = useGetHotSingersQuery(offset, {
    skip: isFetchByCategory
  })
  //查询分类歌手数据
  const { data: categorySingers = [] } = useGetSingersByCategoryQuery(
    {
      offset,
      ...query
    },
    {
      skip: !isFetchByCategory
    }
  )
  // useEffect(() => {
  //   setSingers(prev => {
  //     if (prev.offset === offset) return prev;
  //     return {
  //       offset,
  //       data: prev.data.concat(isFetchByCategory ? categorySingers : hotSingers)
  //     };
  //   });
  // }, [isFetchByCategory, categorySingers, hotSingers, offset]);

  const singers = isFetchByCategory ? categorySingers : hotSingers;

  const handleClickCategory = category => {
    setQuery({ ...query, category })
  }
  const handleClickAlpha = alpha => {
    setQuery({ ...query, alpha })
  }
  //下拉刷新
  const handlePulldown = () => {
    console.log('pulldown')
    setLoading({ ...loading, pullDown: true })
    // setOffset(0)
    setTimeout(() => {
      setLoading({ ...loading, pullDown: false })
    }, 2000)
  }

  const handlePullup = () => {
    console.log('pullup')
    setLoading({ ...loading, pullUp: true })
    // setOffset(singers.data.length)
    setTimeout(() => {
      setLoading({ ...loading, pullUp: false })
    }, 2000)
  }

  const singerElemenents = singers.map((e, index) => {
    return (
      <ListItem
        avatarUrl={e.picUrl + `?param=150x150`}
        singerName={e.name}
        key={e.id + `${index}`}
      />
    )
  })

  return (
    <ContainerWrapper>
      <div className='menu'>
        <HotCategory onClick={handleClickCategory} />
        <AlphaCategory onClick={handleClickAlpha} />
      </div>
      <ListContainer>
        <Scroll
          pullDown={handlePulldown}
          pullDownLoading={loading.pullDown}
          pullUp={handlePullup}
          pullUpLoading={loading.pullUp}
        >
          <ul>{singerElemenents}</ul>
        </Scroll>
      </ListContainer>
    </ContainerWrapper>
  )
}

export default Singers;
