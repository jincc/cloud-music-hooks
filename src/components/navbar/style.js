import styled, { css } from 'styled-components';
import style from '../../styles/global';
export const NavbarStyled = styled.div`
  background: ${style['theme-color']};

  .menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 15px;

    .iconfont {
      color: #fff;
      font-size: 22px;
    }

    .title {
      color: #fff;
      font-size: 22px;
    }
  }

  .tab {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    .item {
      padding-bottom: 5px;
      span {
        color: ${style['font-color-light']};
        font-size: ${style['font-size-m']};
        text-align: center;
      }
    }
  }
`;

export const tabSelectLineStyled = css`
border: 1px solid #fff`;

