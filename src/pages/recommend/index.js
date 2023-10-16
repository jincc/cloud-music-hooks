import AlbumList from '../../components/recommend/albumlist'
import Banner from '../../components/recommend/banner'
import styled from 'styled-components'
import Scroll from '../../components/scroll'
import style from '../../styles/global'
const Container = styled.div`
  position: fixed;
  top: 90px;
  width: 100%;
  bottom: 0;
  background-color: ${style['theme-color']};
  overflow: auto;
`

const Recommend = () => {
  return (
    <Container>
      {/* <Scroll> */}
        {/* <div style={{overflow: 'auto'}}> */}
          <Banner />
          <AlbumList />
        {/* </div> */}
      {/* </Scroll> */}
    </Container>
  )
}

export default Recommend
