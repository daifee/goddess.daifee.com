'use strict';

const { app } = require('egg-mock/bootstrap');


exports.int = function(min = 0, max = 999999) {
  const range = max - min;
  const result = range * Math.random() + min;

  return Math.floor(result);
};

exports.string = function(len = 9, seed = '发窘啊876发达奇偶') {
  const result = [];
  let index;
  while (result.length < len) {
    index = exports.int(0, seed.length);
    result.push(seed[index]);
  }

  return result.join('');
};


exports.user = function(user = {}) {
  return Object.assign({
    name: exports.string(),
    password: exports.string(7, 'fjaio*7f^&fda324'),
    phone: exports.string(11, '123456789'),
  }, user);
};

exports.label = function(label = {}) {
  return Object.assign({
    name: exports.string(6),
    description: exports.string(32),
  }, label);
};

exports.picture = function(picture = {}) {
  return Object.assign({
    url: exports.string(12),
  }, picture);
};


exports.createUser = async function(user = {}) {
  const ctx = app.mockContext({});
  const { User } = ctx.model;
  const data = exports.user(user);
  return await User.create(data);
};


exports.createUsers = async function(num = 1, user = {}) {
  const ctx = app.mockContext({});
  const { User } = ctx.model;

  const data = loop(() => exports.user(user), num);
  return await User.create(data);
};


exports.createLabel = async function(label = {}) {
  const ctx = app.mockContext({});
  const { Label } = ctx.model;
  const data = exports.label(label);
  return await Label.create(data);
};


exports.createLabels = async function(num = 1, label = {}) {
  const ctx = app.mockContext({});
  const { Label } = ctx.model;

  const data = loop(() => exports.label(label), num);
  return await Label.create(data);
};


exports.createPicture = async function(picture = {}) {
  const ctx = app.mockContext({});
  const { Picture } = ctx.model;
  const data = exports.picture(picture);
  return await Picture.create(data);
};

exports.createPictures = async function(num = 1, picture = {}) {
  const ctx = app.mockContext({});
  const { Picture } = ctx.model;

  const data = loop(() => exports.picture(picture), num);
  return await Picture.create(data);
};

function loop(cb, times = 0) {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(cb());
  }

  return result;
}
