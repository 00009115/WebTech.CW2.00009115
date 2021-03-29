"use strict";

//Basic Setup
var express = require("express");

var router = express.Router();

var fs = require('fs');

var path = require('path');

var Validator = require("../services/validators");

var DbContext = require("../services/db");

var root = require("../utils").root;

var getCollection = require("../utils").getCollection;

var dbc = new DbContext();
var v = new Validator();
dbc.useCollection('blogs.json');
router.get("/", function (req, res) {
  dbc.getAll(function (records) {
    return res.render("blogs", {
      blogs: records
    });
  }, function () {
    return res.render("blogs", {
      blogs: null
    });
  });
});
router.get("/add", function (req, res) {
  res.render("add", {});
});
router.post("/add", function (req, res) {
  if (v.isValid(req.body)) {
    dbc.saveOne(req.body, function () {
      return res.render("add", {
        success: true
      });
    });
  } else {
    res.render("add", {
      error: true,
      success: false
    });
  }
});
router.get("/:id", function (req, res) {
  dbc.getOne(req.params.id, function (record) {
    return res.render("blog", {
      blog: record
    });
  }, function () {
    return res.sendStatus(404);
  });
});
router.get("/:id/delete", function (req, res) {
  dbc.deleteOne(req.params.id, function () {
    return res.redirect("/blogs");
  }), function () {
    return res.sendStatus(500);
  };
});
module.exports = router;