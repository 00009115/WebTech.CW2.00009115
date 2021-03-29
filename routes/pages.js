//Basic Setup
const express = require("express");
const router = express.Router();

const fs = require('fs');
const path = require('path');

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()

dbc.useCollection('blogs.json');

router.get("/", (req, res) => {
  dbc.getAll(
    records => res.render("index", { blogs: records }),
    () => res.render("index", { blogs: null })
  )
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contacts", (req, res) => {
  res.render("contacts");
});

module.exports = router;
