"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var path = require("path");

var generateID = require("../utils").generateID;

var date = require("../utils").date;

var root = require("../utils").root;

var DbContext =
/*#__PURE__*/
function () {
  function DbContext() {
    _classCallCheck(this, DbContext);

    this.collection = null;
  }

  _createClass(DbContext, [{
    key: "useCollection",
    value: function useCollection() {
      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      this.collection = path.join(root, "database/".concat(collection));
      console.log(this.collection);
    }
  }, {
    key: "getOne",
    value: function getOne(id, successCb, errorCb) {
      fs.readFile(this.collection, "utf8", function (err, data) {
        if (err) errorCb();
        var records = JSON.parse(data);
        var record = records.filter(function (record) {
          return record.id == id;
        })[0];
        successCb(record);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(successCb, errorCb) {
      fs.readFile(this.collection, "utf8", function (err, data) {
        if (err) errorCb();
        var records = JSON.parse(data);
        var validRecords = records.filter(function (record) {
          return record.archive != true;
        });
        successCb(validRecords);
      });
    }
  }, {
    key: "saveOne",
    value: function saveOne(newRecord, successCb, errorCb) {
      var _this = this;

      fs.readFile(this.collection, "utf8", function (err, data) {
        if (err) errorCb();
        var records = JSON.parse(data);
        records.push({
          id: generateID(),
          title: newRecord.title,
          type: newRecord.type,
          author: newRecord.author,
          text: newRecord.text,
          date: date(),
          edited: false
        });
        fs.writeFile(_this.collection, JSON.stringify(records), function (err) {
          if (err) errorCb();
          successCb();
        });
      });
    }
  }, {
    key: "deleteOne",
    value: function deleteOne(id, successCb, errorCb) {
      var _this2 = this;

      fs.readFile(this.collection, "utf8", function (err, data) {
        if (err) errorCb();
        var records = JSON.parse(data);
        var filtered = records.filter(function (record) {
          return record.id != id;
        }) || [];
        fs.writeFile(_this2.collection, JSON.stringify(filtered), function (err) {
          if (err) errorCb();
          successCb();
        });
      });
    }
  }]);

  return DbContext;
}();

module.exports = DbContext;