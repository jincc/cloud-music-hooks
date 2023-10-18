// 热门区域
import styled from "styled-components";
import style from '../../styles/global';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchHotSearchKeywords, selectSearchState } from "../../store/api/searchSlice";

const Container = styled.div`
  padding: 35px 16px 0px 16px;
  .title {
    color: ${style["font-color-desc-v2"]};
    font-size: ${style["font-size-m"]};
  }
  .hot {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px 0;

    .item {
      background: #fff;
      color: ${style["font-color-desc"]};
      font-size: ${style["font-size-m"]};
      padding: 5px 8px;
      margin: 5px;
      border-radius: 3px;
    }
  }
`;

const Hot = () => {
  const dispatch = useDispatch();
  const {hots=[]} = useSelector(selectSearchState);
  useEffect(() => {
    dispatch(fetchHotSearchKeywords());
  }, []);

  const childs = hots.map((e, index) => {
    return <li  className='item' key={index}>{e.first}</li>
  })

  return <Container>
    <div className="title">热门搜索</div>
    <ul className="hot">
      {childs}
    </ul>
  </Container>
}
export default Hot;