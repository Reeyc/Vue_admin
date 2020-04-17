export const throttle = (callback, delay) => {
  let firstTime = true;
  let previous = +new Date();
  return function(...arg) {
    if (firstTime) {
      callback.apply(this, arg);
      firstTime = false;
      return;
    }
    let now = +new Date();
    if (now - previous >= delay) {
      callback.apply(this, arg);
      previous = now;
    }
  };
};

export const debounce = (fn, delay) => {
  let firstTime = true;
  let timer = null;
  return function(...arg) {
    if (firstTime) {
      fn.apply(this, arg);
      return (firstTime = false);
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
};
