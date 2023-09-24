import styled from "styled-components";
import style from '../../styles/global';
const CardWrapperStyled = styled.div`
  width: ${props => props.$isBigMode ? '32vw' : '27vw'};
  height: ${props => props.$isBigMode ? '32vw' : '27vw'};
  padding-bottom: ${props => props.$isBigMode ? '3px': '0'};
  position: relative;
  
  .cover {
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }

  .bottomText {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
    text-align: left;
    font-size: ${style["font-size-s"]};
    color: #fff;
  }

  .decorate {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 25px;
    ${style.decorateBackground()}
  }
`;

const ListCard = ({data, isBigMode}) => {
  // isBigMode用来区分卡片的大小模式
  const {updateFrequency, coverImgUrl} = data;
  return <CardWrapperStyled $isBigMode={isBigMode}>
    <img src={coverImgUrl} alt="rank_card" className="cover"/>
    <div className="decorate"></div>
    <span className="bottomText">{updateFrequency}</span>
  </CardWrapperStyled>
};

export default ListCard;