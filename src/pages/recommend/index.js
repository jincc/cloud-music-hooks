import AlbumList from '../../components/recommend/albumlist'
import Banner from '../../components/recommend/banner'
import styled from 'styled-components'
import Scroll from '../../components/scroll'
import style from '../../styles/global'
import { useSelector } from 'react-redux'
import { selectRecommend } from '../../store/api/recommendSlice'
import Spinner from '../../components/spinner'
import HomeLayout from '../home/layout'

const Recommend = () => {
  const {loadding} = useSelector(selectRecommend);
  return (
    <HomeLayout>
      { loadding ? <Spinner /> : null}
      <Banner />
      <AlbumList />
    </HomeLayout>
  )
}

export default Recommend
