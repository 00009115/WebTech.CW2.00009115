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
const dbcUser = new DbContext()
const v = new Validator()

dbc.useCollection('blogs.json');
dbcUser.useCollection('users.json');

router.get("/", (req, res) => {
  let signedInUser = {};

  dbcUser.checkUser(
    user => { signedInUser = user }
  )

  dbc.getAll(
    records => res.render("index", { blogs: records, user: signedInUser }),
    () => res.render("index", { blogs: null })
  )
});

router.get("/profile", (req, res) => {
  let signedInUser = {};

  dbcUser.checkUser(
    user => { signedInUser = user }
  )

  dbc.getAll(
    records => res.render("profile", { blogs: records, user: signedInUser }),
    () => res.render("profile", { blogs: null })
  )
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contacts", (req, res) => {
  res.render("contacts");
});

module.exports = router;
