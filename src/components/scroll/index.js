import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types';
import { useRef } from "react";
import BScroll from "better-scroll";
import styled from "styled-components";
import Loading from "../loading";
import { debounce } from "../../utils";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PullDownStyled = styled.div`
  display: ${props => props.$show ? '' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const PullUpStyled = styled.div`
  display: ${props => props.$show ? '' : 'none'};
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 100;
`;


const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState(null);
  const scrollContainerRef = useRef();

  //下拉刷新、上拉刷新防抖函数，避免重复callback至外界
  const debouncePullDown = debounce(props.pullDown, 500);
  const debouncePullUp = debounce(props.pullUp, 500);

  // 创建bscroll实例
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: props.direction  === 'horizental',
      scrollY: props.direction === 'vertical',
      probeType: 3,
      click: props.click,
      bounce: {
        top: props.bounceTop,
        bottom: props.bouceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
  }, []);

  // 每次重新渲染都刷新实例
  useEffect(() => {
    if (props.refresh && bScroll) {
      bScroll.refresh();
    }
  }, [bScroll, props]);

  //绑定滚动事件
  useEffect(() => {
    if (!bScroll || !props.onScroll) return;

    bScroll.on('scroll', scroll => {
      props.onScroll(scroll);
    });

    return () => {
      bScroll.off('scroll');
    }
  }, [bScroll, props]);

  // 上拉刷新
  useEffect(() => {
    if (!bScroll || !debouncePullUp) return;

    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        debouncePullUp();
      }
    });

    return () => {
      bScroll.off('scrollEnd');
    }
  }, [bScroll, debouncePullUp])

  useEffect(() => {
    if (!bScroll || !debouncePullDown) return;

    bScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        debouncePullDown();
      }
    });

    return () => {
      bScroll.off('touchEnd');
    }
  }, [bScroll, debouncePullDown]);


  //给外界暴露方法
  useImperativeHandle(ref, () => {
    return {
      refresh: () => {
        if (bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      getBScroll: () => {
        return bScroll;
      }
    }
  });

  return <ScrollContainer ref={scrollContainerRef}>
    {props.children}
    <PullDownStyled $show={props.pullDownLoading}>
      <Loading />
    </PullDownStyled>
    <PullUpStyled $show={props.pullUpLoading}>
      <Loading />
    </PullUpStyled>
  </ScrollContainer>
});

Scroll.propTypes = {
  // 滚动方向
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  //是否支持点击
  click: PropTypes.bool,
  //是否刷新
  refresh: PropTypes.bool,
  //滚动触发的回调函数
  onScroll: PropTypes.func,
  //上拉加载的逻辑
  pullUp: PropTypes.func,
  //下拉加载的逻辑
  pullDown: PropTypes.func,
  //是否展示上拉加载动画
  pullUpLoading: PropTypes.bool,
  //是否展示下来加载动画
  pullDownLoading: PropTypes.bool,
  //是否支持向上吸顶
  bounceTop: PropTypes.bool,
  //是否支持向下吸底
  bouceBottom: PropTypes.bool
}


Scroll.defaultProps = {
  // 滚动方向
  direction: 'vertical',
  //是否支持点击
  click: true,
  //是否刷新
  refresh: true,
  //滚动触发的回调函数
  onScroll: null,
  //上拉加载的逻辑
  pullUp: null,
  //下拉加载的逻辑
  pullDown: null,
  //是否展示上拉加载动画
  pullUpLoading: false,
  //是否展示下来加载动画
  pullDownLoading: false,
  //是否支持向上吸顶
  bounceTop: true,
  //是否支持向下吸底
  bouceBottom: true
}

export default Scroll;