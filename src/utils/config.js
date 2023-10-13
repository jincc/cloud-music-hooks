/**
 * 歌手列表分类信息数据源
 * @returns 
 */
export function getDefaultSingerCategory() {
  return [
    //#前面代表area, 后面代表type
    {name: '全部', id: '-1#-1'},
    {name: '华语男', id: '7#1'},
    {name: '华语女', id: '7#2'},
    {name: '华语组合', id: '7#3'},
    {name: '欧美男', id: '96#1'},
    {name: '欧美女', id: '96#2'},
    {name: '欧美组合', id: '96#3'},
    {name: '日本男', id: '8#1'},
    {name: '日本女', id: '8#2'},
    {name: '日本组合', id: '8#3'},
    {name: '韩国男', id: '16#1'},
    {name: '韩国女', id: '16#2'},
    {name: '韩国组合', id: '16#3'},
    {name: '其他男', id: '0#1'},
    {name: '其他女', id: '0#2'},
    {name: '其他组合', id: '0#3'},
  ]
}

export function getDefaultAlpha() {
  let items = [];
  for (const char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    items.push({id: char, name: char});
  }
  items.splice(0, 0, {id: null, name: '全部'})
  return items;
}

export const BASE_URL = 'http://localhost:3300';