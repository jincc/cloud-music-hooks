import { BASE_URL } from "./config";

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
/**
 * 延时发出promise
 * @param {*} ms 
 * @returns 
 */
export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
/**
 * 发送get网络请求
 * 注意: 因为是本域请求，1000ms的作用在于模拟慢速网络
 * @param {*} uri 
 */
export async function get(uri) {
  let response = await delay(1000).then(v => fetch(BASE_URL + uri));
  if (!response.ok) {
   throw new Error(response.statusText);
  };
  return await response.json();
}