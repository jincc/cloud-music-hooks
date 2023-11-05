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
function buildQueryString(params) {
  const query = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return query;
}

/**
 * 发送get网络请求
 * 注意: 因为是本域请求，1000ms的作用在于模拟慢速网络
 * @param {*} uri 
 */
export async function get(uri, params) {
  let query = '';
  if (params) {
    query = '?' + buildQueryString(params);
  }
  let validUrl = uri.startsWith('http') ? uri : BASE_URL + uri + query;
  let response = await delay(1000).then(v => fetch(validUrl));
  if (!response.ok) {
   throw new Error(response.statusText);
  };
  return await response.json();
}

export function formatPlayCount(count) {
  if (count < 1000) return count;

  if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  }
  return Math.floor(count / 10000000) / 10 + '亿';
}

export function getMp3Url(songId) {
  return `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
}

/**
 * 监测mp3地址是否是可播放地址
 * @param {*} url 
 */
export function checkMp3(url) {
  return new Promise((resolve, reject) => {
    var audio = new Audio();
    audio.src = url;
  
    audio.addEventListener('canplaythrough', function() {
      resolve(true);
    });
  
    audio.addEventListener('error', function() {
      resolve(false);
    });
  
    audio.load();
  });
}
/**
 * 可视化播放时间
 * @param {*} time 
 */
export function formatPlaytime(time) {
  if (!time) return "--"

  time = Math.floor(Number(time/1000));
  const m = Math.floor(time/60);
  const s = `${Math.floor(time % 60)}`.padStart(2, '0');
  return `${m}:${s}`;
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * 随机打乱歌曲列表
 * @param {*} playlist 
 */
export function shuffleSongList(playlist) {
  if (playlist.length === 0 ) return [];

  for (let index = playlist.length - 1; index > 0; index--){
    const from = getRandomIndex(0, index-1);
    const to = index;
    const t = playlist[from];
    playlist[from] = playlist[to];
    playlist[to] = t;
  }
  return [...playlist];
}