<template>
  <div class="errpr-page">
    <p>
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </p>
    <p>
      <span>您访问的页面不存在</span>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.errpr-page {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  p:first-child {
    text-align: center;
    font-family: cursive;
    font-size: 200px;
    font-weight: bold;
    letter-spacing: 5px;
    color: #fff;
    span {
      cursor: pointer;
      text-shadow: 0px 0px 2px #686868, 0px 1px 1px #ddd, 0px 2px 1px #d6d6d6, 0px 3px 1px #ccc, 0px 4px 1px #c5c5c5, 0px 5px 1px #c1c1c1,
        0px 6px 1px #bbb, 0px 7px 1px #777, 0px 8px 3px rgba(100, 100, 100, 0.4), 0px 9px 5px rgba(100, 100, 100, 0.1),
        0px 10px 7px rgba(100, 100, 100, 0.15), 0px 11px 9px rgba(100, 100, 100, 0.2), 0px 12px 11px rgba(100, 100, 100, 0.25),
        0px 13px 15px rgba(100, 100, 100, 0.3);
    }
  }
  p:last-child {
    text-align: center;
    color: #666;
    font-size: 30px;
    text-shadow: 0 1px 0 #fff;
    letter-spacing: 4px;
    line-height: 2em;
    span {
      margin-right: 20px;
    }
  }
}
</style>
