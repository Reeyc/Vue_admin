const jwt = require("jsonwebtoken");

/** 生成 **/
const setToken = (username, userid) => {
  const today = new Date().toLocaleDateString();
  const todayTimestamp = new Date(today).getTime() / 1000;
  const tomorrowTimestamp = todayTimestamp + 60 * 60 * 24 * 1;
  const token = jwt.sign({ name: username, _id: userid }, "Reeyc", {
    //次日0点过期
    expiresIn: Math.floor(tomorrowTimestamp - new Date().getTime() / 1000)
  });
  return Promise.resolve(token);
};

/** 解析 **/
const verToken = token => {
  const info = jwt.verify(token.split(" ")[1], "Reeyc");
  return Promise.resolve(info);
};

module.exports = { setToken, verToken };
