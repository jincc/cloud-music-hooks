import { HotCategory, AlphaCategory } from '../../components/horizontalList'
import styled from 'styled-components'
import style from '../../styles/global'
import {
  useGetSingersByCategoryQuery,
  useGetHotSingersQuery
} from '../../store/api/cloudApi'
import { useEffect, useRef, useState } from 'react'
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
  const scrollRef = useRef();
  //查询所用的参数，交互会重新修改这些参数触发重新加载
  const [query, setQuery] = useState({
    category: null,
    alpha: null,
    offset: 0
  })
  //loading状态机
  const [loading, setLoading] = useState({
    pullDown: false,
    pullUp: false
  });

  // 查询歌手数据
  const {data: singers = []} = useGetSingersByCategoryQuery(query);
  useEffect(() => {
    if (loading.pullDown || loading.pullUp) {
      setLoading({pullUp: false, pullDown: false});
    }
  });

  const handleClickCategory = category => {
    setQuery({ ...query, category, offset: 0 });
    scrollRef.current.refresh();
  }
  const handleClickAlpha = alpha => {
    setQuery({ ...query, alpha, offset: 0 });
    scrollRef.current.refresh();
  }
  //下拉刷新
  const handlePulldown = () => {
    console.log('pulldown')
    setLoading({ ...loading, pullDown: true })
    setQuery({...query, offset: 0});
  }

  const handlePullup = () => {
    console.log('pullup')
    setLoading({ ...loading, pullUp: true })
    setQuery({...query, offset: singers.length});
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
          ref={scrollRef}
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
