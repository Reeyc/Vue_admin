export default (timestamp, needTime) => {
  if (!timestamp) return false;
  const date = new Date(timestamp);

  let y = date.getFullYear();
  let M = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  M = M < 10 ? `0${M}` : M;
  d = d < 10 ? `0${d}` : d;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  if (needTime) {
    return `${y}-${M}-${d} ${h}:${m}:${s}`;
  } else {
    return `${y}-${M}-${d}`;
  }
};
