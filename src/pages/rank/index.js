import { useMemo } from 'react'
import { useGetRankListQuery } from '../../store/api/cloudApi'
import { OfficialRowStyled, RankWapperStyled, WorldwideWapperStyled } from './style'
import ListCard from '../../components/rank/listCard'
import SongList from '../../components/rank/songlist'

const OfficialRow = () => {
  return <div>我是行数据</div>
}

const Rank = () => {
  const { data: rankData = [] } = useGetRankListQuery()
  // 分离排行榜数据, 返回官方版和全球榜数据
  const splitRankData = useMemo(() => {
    let worldwideList = []
    let otherList = []
    rankData.forEach(element => {
      if (element.tracks && element.tracks.length > 0) {
        otherList.push(element)
      } else {
        worldwideList.push(element)
      }
    })
    return [otherList, worldwideList]
  }, [rankData])
  console.log(splitRankData)

  const officialRows = splitRankData[0].map((e, index) => {
    return <OfficialRowStyled key={e.id + `${index}`}>
      <ListCard data={e} />
      <SongList songs={e.tracks}/>
    </OfficialRowStyled>
  })

  const worldwideRows = splitRankData[1].map((e, index) => {
    return <ListCard data={e} isBigMode={true} key={e.id + `${index}`}/>
  })

  return (
    <RankWapperStyled>
      <section className='area'>
        <h2>官方版</h2>
        { officialRows }
      </section>
      <section className='area'>
        <h2>全球榜</h2>
        <WorldwideWapperStyled>
          {worldwideRows}
        </WorldwideWapperStyled>
      </section>
    </RankWapperStyled>
  )
}

export default Rank
