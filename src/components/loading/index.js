import styled, {keyframes} from "styled-components";
import style from '../../styles/global';

const scaleY = keyframes`
  0%, 100% {
    transform: scaleY(0.4);
  }
  40% {
    transform: scaleY(1);
  }
`;

const LoaddingStyled = styled.div`
  padding-top: 10px;
  height: 10px;
  width: 100%;
  text-align: center;
  font-size: ${style["font-size-s"]};
  color: ${style["theme-color"]};
  .column {
    display: inline-block;
    margin-right: 2px;
    width: 2px;
    height: 100%;
    background-color: ${style["theme-color"]};
    animation: ${scaleY} 1s infinite;
  }

  .column:nth-child(2) {
    animation-delay: -0.4s;
  }
  .column:nth-child(3) {
    animation-delay: -0.6s;
  }
  .column:nth-child(4) {
    animation-delay: -0.5s;
  }
  .column:nth-child(5) {
    animation-delay: -0.2s;
  }
`;

const Loading = () => {
  return (
    <LoaddingStyled>
      <div className="column"/>
      <div className="column"/>
      <div className="column"/>
      <div className="column"/>
      <div className="column"/>
      <span>拼命加载中</span>
    </LoaddingStyled>
  )
}

export default Loading;