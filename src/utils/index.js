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