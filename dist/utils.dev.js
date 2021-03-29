"use strict";

var path = require("path");

module.exports.generateID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

module.exports.date = function () {
  var now = new Date();
  var day = String(now.getDate()).padStart(2, '0');
  var month = String(now.getMonth() + 1).padStart(2, '0');
  var year = now.getFullYear();
  var hour = now.getHours();
  var minute = now.getMinutes();
  return day + '.' + month + '.' + year + ' | ' + hour + ':' + minute;
};

var root = path.dirname(require.main.filename || process.require.main.filename);
module.exports.root = root;

module.exports.getCollection = function (collection) {
  return path.join(root, "database/".concat(collection));
};