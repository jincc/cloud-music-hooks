/**
 * 防抖函数
 * @param {*} func 
 * @param {*} delay 
 * @returns 
 */
export function debounce(func, delay) {
  if (typeof func !== 'function') return null;

  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  }

}
/**
 * 歌手页查询接口的url地址
 * @param {*} param0 
 * @returns 
 */
export function getQuerySingerParams({category, alpha, offset}) {
  if (category || alpha) {
    let uri = new URLSearchParams();
    uri.set('offset', offset);
    if (category != null) {
      const [area, type] = category.split('#')
      uri.set('type', type);
      category && uri.set('area', area);
    }
    if (alpha != null) {
      uri.set('initial', alpha);
    }
    return `/artist/list?${uri.toString()}`;
  }
  return `/top/artists?offset=${offset}`;
}