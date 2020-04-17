const getDay = (day, showYear) => {
  const today = new Date();
  const targetday = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday);
  let tYear = today.getFullYear();
  let tMonth = today.getMonth() + 1;
  let tDate = today.getDate();
  tMonth = tMonth < 10 ? `0${tMonth}` : tMonth;
  tDate = tDate < 10 ? `0${tDate}` : tDate;
  return showYear ? `${tYear}-${tMonth}-${tDate}` : `${tMonth}-${tDate}`;
};

// export default getDay;
module.exports = getDay;
