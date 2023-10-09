import styled from 'styled-components'
import style from '../../styles/global'
export const RankWapperStyled = styled.div`
  position: fixed;
  top: 90px;
  width: 100%;
  bottom: 0;
  overflow: auto;
  .area {
    padding: 10px 5px;
    h2 {
      color: ${style['font-color-desc']};
      font-size: ${style['font-size-m']};
      font-weight: 700;
    }
  }

  .area:first-of-type {
    margin-top: 5px;
  }
`
export const OfficialRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${style['border-color']};
  padding: 10px 0 3px 0;
`;

export const WorldwideWapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 15px;
  &::after {
    content: '';
    width: 32vw;
  }
`;
