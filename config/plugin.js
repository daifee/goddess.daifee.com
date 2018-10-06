'use strict';

// had enabled by egg
// exports.static = true;

exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};


exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
