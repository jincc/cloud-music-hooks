import AlbumList from '../../components/recommend/albumlist'
import Banner from '../../components/recommend/banner'
import styled from 'styled-components'
import Scroll from '../../components/scroll'
import style from '../../styles/global'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeData, selectRecommend } from '../../store/api/recommendSlice'
import Spinner from '../../components/spinner'
import HomeLayout from '../home/layout'
import { useEffect } from 'react'
import DragonBall from '../../components/recommend/dragonBall'
import NewAlbumSongs from '../../components/recommend/newAlbumSongs'

const Recommend = () => {
  const dispatch = useDispatch()
  const {loadding, banners, albums, dragonBalls, newAlbumSongs} = useSelector(selectRecommend);
  //获取首页数据
  useEffect(() => {
    dispatch(fetchHomeData())
  }, [])

  if (loadding) {
    return <Spinner />
  }
  return (
    <HomeLayout>
      <Banner banners={banners} />
      <DragonBall dragonBalls={dragonBalls}/>
      <AlbumList albums={albums} />
      <NewAlbumSongs data={newAlbumSongs} />
    </HomeLayout>
  )
}

export default Recommend
