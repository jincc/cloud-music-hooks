import AlbumList from '../../components/recommend/albumlist'
import Banner from '../../components/recommend/banner'
import styled from 'styled-components'
import Scroll from '../../components/scroll'
import style from '../../styles/global'
import { useSelector } from 'react-redux'
import { selectRecommend } from '../../store/api/recommendSlice'
import Loading from '../../components/loading'
import Spinner from '../../components/spinner'
const Container = styled.div`
  position: fixed;
  top: 90px;
  width: 100%;
  bottom: 0;
  /* background-color: ${style['theme-color']}; */
  overflow: auto;
`

const Recommend = () => {
  const {loadding} = useSelector(selectRecommend);
  return (
    <Container>
      { loadding ? <Spinner /> : null}
      <Banner />
      <AlbumList />
    </Container>
  )
}

export default Recommend
