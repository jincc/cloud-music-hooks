import { useCallback, useState } from 'react'
import Hot from '../../components/search/hot'
import Navi from '../../components/search/navi'
import SearchContent from '../../components/search/searchContent'
import { debounce } from '../../utils'

const Search = () => {
  const [keyword, setKeyword] = useState()
  // 搜索变化监听
  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  const isSearch = keyword && keyword.length > 0;
  return (
    <div>
      <Navi onChange={onChange} />
      {isSearch ? <SearchContent keyword={keyword} /> : null}
      {!isSearch ? <Hot /> : null}
    </div>
  )
}

export default Search
