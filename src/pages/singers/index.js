import {HotCategory, AlphaCategory} from "../../components/horizontalList";
import styled from "styled-components";
import style from '../../styles/global';
const ContainerWrapper = styled.div`
  .menu {
    margin-top: 5px;
  }
`;

const List = styled.ul`
  margin-top: 10px;
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
// https://p1.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg?param=300x300
const Singers = () => {
  const handleClickCategory = (category) => {
    console.log(category);
  }
  const handleClickAlpha = (alpha) => {
    console.log(alpha);
  }
  return <ContainerWrapper>
    <div className="menu">
      <HotCategory onClick={handleClickCategory} />
      <AlphaCategory onClick={handleClickAlpha}/>
    </div>
    <List>
      <ListItem avatarUrl={`https://p1.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg?param=300x300`} singerName={'林俊杰'}/>
      <ListItem avatarUrl={`https://p1.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg?param=300x300`} singerName={'林俊杰'}/>
      <ListItem avatarUrl={`https://p1.music.126.net/78q0jUUJ0h08GxAs2G-tCA==/109951168529051968.jpg?param=300x300`} singerName={'林俊杰'}/>
    </List>
  </ContainerWrapper>
};

export default Singers;