// 定义全局风格
import { createGlobalStyle, css } from 'styled-components'

// 全局风格
export const GlobalStyle = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}

  /* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
  
  body {
    line-height: 1;
  }

  html, body {
    background: #f2f3f4;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote::before, blockquote::after {
    content: '',
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`

// 扩大点击区域
const extendClick = () => {
  return css`
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  `
}

// fly转场动画
const flyTransition = () => {
  return css`
    transform-origin: right bottom;
    &.fly-enter,
    &.fly-appear {
      transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
    &.fly-enter-active,
    &.fly-appear-active {
      transition: transform 0.3s;
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit {
      transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit-active {
      transition: transform 0.3s;
      transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
  `
}

// 一行文字溢出部分用...
const noWrap = () => {
  return css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const decorateBackground = () => {
  return css`
    /* background: linear-gradient (hsla (0,0%,100%,0),hsla (0,0%,43%,.4)); */
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
  `
}

const hiddenScrollBar = () => {
  return css`
    &::-webkit-scrollbar {
      display: none;
    }
  `
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8', // 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  'border-color': '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  grey: 'grey',
  decorateBackground,
  extendClick,
  noWrap,
  flyTransition,
  hiddenScrollBar
}
