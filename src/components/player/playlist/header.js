import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import style from '../../../styles/global';
import { deleteAll, selectPlayerState } from "../../../store/api/playerSlice";
import { getPlaymodeIconfont } from "../../../utils/config";
const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  .mode-icon, .trash {
    color: ${style["theme-color"]};
    font-size: 20px;
  }
  .mode-title {
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-m"]};
    margin-left: 10px;
  }
  .flex {
    flex: 1;
  }
  .trash {

  }
`;
const Header = () => {
  const dispatch = useDispatch();
  const {mode} = useSelector(selectPlayerState);
  let {icon, title} = getPlaymodeIconfont(mode);

  const handleTrashAll = () => {
    dispatch(deleteAll());
  }

  return <HeaderStyled>
    <span className="iconfont mode-icon" dangerouslySetInnerHTML={{
      __html: icon
    }}></span>
    <span className="mode-title">{title}</span>
    <span className="flex"></span>
    <span className="iconfont trash" onClick={handleTrashAll}>&#xe63d;</span>
  </HeaderStyled>
}
export default Header;