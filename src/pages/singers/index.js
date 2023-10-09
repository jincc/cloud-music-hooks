import {HotCategory, AlphaCategory} from "../../components/horizontalList";
import styled from "styled-components";
import style from '../../styles/global';
import { useGetSingersByCategoryQuery, useGetHotSingersQuery } from "../../store/api/cloudApi";
import { useState } from "react";
const ContainerWrapper = styled.div`
  .menu {
    margin-top: 5px;
  }
`;

const List = styled.ul`
  padding-top: 10px;
  position: fixed;
  top: 150px;
  bottom: 0;
  width: 100%;
  overflow: auto;
`;

const ListItemStyled = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 3px;
  border-bottom: 1px solid ${style["border-color"]}; 
  img {
    width: 13vw;
    height: 13vw;
    border-radius: 3px;
  }
  .singerName {
    padding-left: 15px;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
`;

const ListItem = ({avatarUrl, singerName}) => {
  return (
    <ListItemStyled>
      <img src={avatarUrl} alt="singer" />
      <span className="singerName">{singerName}</span>
    </ListItemStyled>
  )
}
const Singers = () => {
  const [query, setQuery] = useState({
    category: null,
    alpha: null
  });
  const [offset, setOffset] = useState(0);
  // 是否用户选中了分类信息
  const isFetchByCategory = query.category != null || query.alpha != null;
  console.log(isFetchByCategory);
  const {data: hotSingers=[]} = useGetHotSingersQuery(offset, {
    skip: isFetchByCategory
  });

  const {data: categorySingers=[]} = useGetSingersByCategoryQuery({
    offset,
    ...query
  }, {
    skip: !isFetchByCategory
  });

  const singers =  isFetchByCategory ? categorySingers : hotSingers;

  const handleClickCategory = (category) => {
    setQuery({...query, category});
  }
  const handleClickAlpha = (alpha) => {
    setQuery({...query, alpha});
  }
  const singerElemenents = singers.map( (e, index) => {
    return <ListItem avatarUrl={e.picUrl+`?param=150x150`} singerName={e.name} key={e.id + `${index}`} />
  })
  return <ContainerWrapper>
    <div className="menu">
      <HotCategory onClick={handleClickCategory} />
      <AlphaCategory onClick={handleClickAlpha}/>
    </div>
    <List>
      {singerElemenents}
    </List>
  </ContainerWrapper>
};

export default Singers;