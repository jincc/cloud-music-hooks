// 专辑元素
import styled from "styled-components";
import style from '../../styles/global';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .img {
    width: ${props => props.$imgSize};
    height: ${props => props.$imgSize};
    border-radius: 5px;
  }

  .name {
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-l"]};
    padding-left: 15px;
  }
`;

const AlbumItem = ({picUrl, name, onClick, imgSize='50px'}) => {
  return <Container onClick={onClick} $imgSize={imgSize}>
    <img className="img" src={picUrl} alt="album" />
    <p className="name">{name}</p>
  </Container>
}

export default AlbumItem;
