// Mini歌词组件
import styled from 'styled-components'
import style from '../../../styles/global'
import { useSelector } from 'react-redux'
import { selectPlayerState } from '../../../store/api/playerSlice'
import { useEffect } from 'react'

const Container = styled.span`
  ${style.noWrap()}
`

const MiniLyric = () => {
  const { currentLyricRow } = useSelector(selectPlayerState)
  if (!currentLyricRow) return <></>

  return <Container>{currentLyricRow}</Container>
}

export default MiniLyric
