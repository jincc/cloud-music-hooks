import { useEffect, useMemo, useState } from 'react'
import { useGetRankListQuery } from '../../store/api/cloudApi'
import {
  OfficialRowStyled,
  RankWapperStyled,
  WorldwideWapperStyled
} from './style'
import ListCard from '../../components/rank/listCard'
import SongList from '../../components/rank/songlist'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRankList, selectRank } from '../../store/api/rankSlice'
import Spinner from '../../components/spinner'
import { useNavigate } from 'react-router-dom'
import HomeLayout from '../home/layout'

const Rank = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { official = [], worldwide = [], loadding } = useSelector(selectRank)
  // 获取数据
  useEffect(() => {
    dispatch(fetchRankList())
  }, [])
  if (loadding) {
    return <Spinner></Spinner>
  }

  const officialRows = official.map((e, index) => {
    return (
      <OfficialRowStyled
        key={e.id + `${index}`}
        onClick={() => navigate(`/album/${e.id}`)}
      >
        <ListCard data={e} />
        <SongList songs={e.tracks} />
      </OfficialRowStyled>
    )
  })

  const worldwideRows = worldwide.map((e, index) => {
    return (
      <ListCard
        data={e}
        isBigMode={true}
        key={e.id + `${index}`}
        onClick={() => navigate(`/album/${e.id}`)}
      />
    )
  })

  return (
    <HomeLayout>
      <RankWapperStyled>
        <section className='area'>
          <h2>官方版</h2>
          {officialRows}
        </section>
        <section className='area'>
          <h2>全球榜</h2>
          <WorldwideWapperStyled>{worldwideRows}</WorldwideWapperStyled>
        </section>
      </RankWapperStyled>
    </HomeLayout>
  )
}

export default Rank
