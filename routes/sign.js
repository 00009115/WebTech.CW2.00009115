//Basic Setup
const express = require("express");
const router = express.Router();

const Validator = require("../services/validators");
const DbContext = require("../services/db");

const dbc = new DbContext();
const v = new Validator();

dbc.useCollection("users.json");

router.get("/up", (req, res) => {
	res.render("sign-up");
});

router.post("/up", (req, res) => {
	if (v.isValidUser(req.body)) {
		dbc.addUser(req.body, () => res.render("sign-up", { success: true }));
	} else {
		res.render("sign-up", { error: true, success: false });
	}
});

router.get("/in", (req, res) => {
	res.render("sign-in");
});

router.post("/in", (req, res) => {
	if (v.isValidUser(req.body)) {
    dbc.check(req.body, (status) => res.render("sign-in", { success: status }));
	} else {
    res.render("sign-in", { error: true });
	}
});

module.exports = router;
