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
    return res.render("index", {
      blogs: records
    });
  }, function () {
    return res.render("index", {
      blogs: null
    });
  });
});
router.get("/about", function (req, res) {
  res.render("about");
});
router.get("/contacts", function (req, res) {
  res.render("contacts");
});
module.exports = router;