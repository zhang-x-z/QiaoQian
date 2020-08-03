// 防抖函数，防止短时间大量触发同一事件，例如鼠标移动
export function debounce (fn, delay) {
  let timer;
  return function () {
    const _this = this;
    const args = arguments;// 保存传入的参数
    if (timer) {
      clearTimeout(timer);// 访问过于频繁，防抖
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay)
  }
}

export function baseurl () {
  return 'http://127.0.0.1:8000/'
}