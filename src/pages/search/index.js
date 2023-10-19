import { useCallback, useState } from 'react'
import Hot from '../../components/search/hot'
import Navi from '../../components/search/navi'
import SearchContent from '../../components/search/searchContent'
import { debounce } from '../../utils'

const Search = () => {
  const [keyword, setKeyword] = useState('');

  // 搜索变化监听
  const onChange = (e) => {
    setKeyword(e)
  }

  const onClickHot = (keyword) => {
    setKeyword(keyword);
  }

  const isSearch = keyword && keyword.length > 0;
  return (
    <div>
      <Navi onChange={onChange} hotKeyword={keyword} />
      {isSearch ? <SearchContent keyword={keyword} /> : null}
      {!isSearch ? <Hot onClick={onClickHot}/> : null}
    </div>
  )
}

export default Search
