const slideBar = sessionStorage.getItem("slideBar") == 1 ? sessionStorage.getItem("slideBar") : 0;
const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
const userInfo = JSON.parse(localStorage.getItem("userinfo")) ? JSON.parse(localStorage.getItem("userinfo")) : {};

const state = {
  cancelHttpArr: [],
  slideBar,
  msgIsShow: false,
  token,
  userInfo,
  roles: [],
  sceneList: [],
  provinceList: [],
  cityList: []
};

export default state;
