// Mini歌词组件
import styled from 'styled-components'
import style from '../../../styles/global'
import { useSelector } from 'react-redux'
import { selectPlayerState } from '../../../store/api/playerSlice'
import Scroll from '../../../components/scroll'
import { createRef, useEffect, useRef } from 'react'
const Container = styled.div`
  position: absolute;
  bottom: 180px;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 85px;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  li {
    margin: 0 20px;
    line-height: 2;
    color: ${style['font-color-desc']};
    font-size: ${style['font-size-m']};
    ${style.noWrap()}

    &.highlight {
      font-size: ${style['font-size-ll']};
    }
  }
`

const MiniLyric = () => {
  const scrollRef = useRef()
  const allLyricRows = useRef([])
  const { currentLyricRow, lyric } = useSelector(selectPlayerState)
  useEffect(() => {
    let bScroll = scrollRef.current.getBScroll();
    if (currentLyricRow > 2 && lyric && bScroll) {
      //歌词仅显示三行，这里滚动到当前歌曲的前一行，当前歌词区中显示
      let currentLine = allLyricRows.current[currentLyricRow - 1].current;
      bScroll.scrollToElement(currentLine, 1000);
    }
  }, [currentLyricRow, lyric])


  if (!lyric) return <></>

  const rows = lyric.map((e, index) => {
    const className = currentLyricRow === index ? 'highlight' : ''
    const ref = createRef()
    allLyricRows.current[index] = ref
    return <li ref={ref} className={className} key={index}>{e.data}</li>
  })

  return (
    <Container>
      <Scroll ref={scrollRef}>
        <ul>{rows}</ul>
      </Scroll>
    </Container>
  )
}

export default MiniLyric
