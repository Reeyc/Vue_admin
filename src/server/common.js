const express = require("express");
const router = express.Router();

const Mock = require("mockjs");
/**
 * Mock.setup在 node 环境下有Bug
 */
Mock.deferred = (start, end, callback) => {
  const delay = Math.floor(Math.random() * (end - start) + start);
  setTimeout(callback, delay);
};

const SUCCESS_CODE = 20000;
const ERROR_CODE = 50000;

module.exports = { router, Mock, code: { SUCCESS_CODE, ERROR_CODE } };
