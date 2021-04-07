//Basic Setup
const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const Validator = require("../services/validators");
const DbContext = require("../services/db");
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext();
const v = new Validator();

dbc.useCollection("blogs.json");

router.get("/up", (req, res) => {
	res.render("sign-up");
});

router.get("/in", (req, res) => {
	res.render("sign-in");
});

module.exports = router;
